import { useNavigate, useParams } from "react-router-dom";
import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import authAxios from "../services/AxiosInterceptor";
import { MdDone } from "react-icons/md";
import { jsPDF } from "jspdf";

import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "../constant";

export default function Scribs() {

  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#ff0000");
  const [page, setPage] = useState({rectangles:[], circles:[], arrows:[], scribbles:[]})
  const { id } = useParams();
  const [strokeColor, setStrokeColor] = useState("#000");
  const isPaining = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();
  const navigate = useNavigate();

  const isDraggable = action === ACTIONS.SELECT;

  useEffect(() => {
    const getNote = (noteId) => {
      if (noteId === "new") return;
      authAxios.get(`/api/note/${noteId}/`).then((response) => {
        const data = response.data || {};  // Ensure data is an object
  
        // Parse the body string into an actual object
        const parsedData = JSON.parse(data.body.replace(/'/g, '"'));  // Replace single quotes with double quotes for valid JSON
  
        setPage({
          rectangles: parsedData.rectangles || [],  // Default to empty array if undefined
          circles: parsedData.circles || [],
          arrows: parsedData.arrows || [],
          scribbles: parsedData.scribbles || [],
        });
      });
    };
    getNote(id);
  }, [id]);
  

  const updateNote = async (noteId) => {
    const payload = {
      body: JSON.stringify(page), // Convert the `page` object to a string
    };
    authAxios.put(`/api/note/${noteId}/`, payload).then((response) => {
      navigate("/");
    });
  };
  
  
  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setPage((prevPage) => ({
          ...prevPage,
          rectangles: [
            ...prevPage.rectangles,
            {
              id,
              x,
              y,
              height: 20,
              width: 20,
              fillColor,
            }
          ]
        }));      
        break;
      case ACTIONS.CIRCLE:
        setPage((prevPage) => ({
          ...prevPage,
          circles: [
            ...prevPage.circles,
            {
              id,
              x,
              y,
              radius: 20,
              fillColor,
            }
          ]
        }));
        break;
      case ACTIONS.ARROW:
        setPage((prevPage) => ({
          ...prevPage,
          arrows: [
            ...prevPage.arrows,
            {
              id,
              points: [x, y, x + 20, y + 20],
              fillColor,
            }
          ]
        }));
        break;
      case ACTIONS.SCRIBBLE:
        setPage((prevPage)=>({
          ...prevPage,
          scribbles: [
            ...prevPage.scribbles,
            {
              id,
              points: [x, y],
              fillColor,
            }
          ]
        }))
        break;
    }

  }
  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setPage((prevPage) => ({
          ...prevPage,
          rectangles: prevPage.rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }
            return rectangle;
          }),
        }));
        break;    
      case ACTIONS.CIRCLE:
        setPage((prevPage) => ({
          ...prevPage,
          circles: prevPage.circles.map((circle) => {
            if(circle.id === currentShapeId.current){
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          }),
        }));      
        break;
      case ACTIONS.ARROW:
        setPage((prevPage) => ({
          ...prevPage,
          arrows: prevPage.arrows.map((arrow) => {
            if(arrow.id === currentShapeId.current){
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          }),
        }));
        break;
      case ACTIONS.SCRIBBLE:
        setPage((prevPage) => ({
          ...prevPage,
          scribbles: prevPage.scribbles.map((scribble) => {
            if(scribble.id === currentShapeId.current){
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          }),
        }));
        break;
    }
}

  function onPointerUp() {
    isPaining.current = false;
  }

  //exporting to pdf format 
  function handleExport() {
    const uri = stageRef.current.toDataURL(); // Get canvas data as image
    
    const pdf = new jsPDF({
      orientation: "portrait", // or "landscape"
      unit: "mm",
      format: "a4", // You can choose other formats
    });
    const imgProps = pdf.getImageProperties(uri);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // Maintain aspect ratio
    pdf.addImage(uri, "PNG", 0, 0, pdfWidth, pdfHeight); // Add image to PDF
    pdf.save("exported-document.pdf"); // Save the PDF
  }

  function onClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  return (
    <>
      <div className="relative w-full h-screen overflow-auto">
        {/* {console.log(page)} */}
        <div className="absolute top-0 z-10 w-full py-2 ">
          <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto overflow-x-auto border shadow-lg rounded-lg">
            <button
              className={
                action === ACTIONS.SELECT
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.SELECT)}
            >
              <GiArrowCursor size={"2rem"} color="#36454F" />
            </button>
            <button
              className={
                action === ACTIONS.RECTANGLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.RECTANGLE)}
            >
              <TbRectangle size={"2rem"} color="#36454F"/>
            </button>
            <button
              className={
                action === ACTIONS.CIRCLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.CIRCLE)}
            >
              <FaRegCircle size={"1.5rem"} color="#36454F" />
            </button>
            <button
              className={
                action === ACTIONS.ARROW
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.ARROW)}
            >
              <FaLongArrowAltRight size={"2rem"} color="#36454F"/>
            </button>
            <button
              className={
                action === ACTIONS.SCRIBBLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.SCRIBBLE)}
            >
              <LuPencil size={"1.5rem"} color="#36454F"/>
            </button>

            <button>
              <input
                className="w-6 h-6"
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
              />
            </button>

            <button onClick={handleExport}>
              <IoMdDownload size={"1.5rem"} color="#36454F"/>
            </button>

            <button onClick={() => updateNote(id)}>
              <MdDone size={"1.5rem"} color="#36454F"/>
            </button>

          </div>
        </div>
        {/* Canvas */}
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ minWidth: "100%", minHeight: "100%" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              height={window.innerHeight}
              width={window.innerWidth}
              fill="#ffffff"
              id="bg"
              onClick={() => {
                transformerRef.current.nodes([]);
              }}
            />

              {
                page.rectangles.map((rectangle)=>(
                  <Rect
                    key={rectangle.id}
                    x={rectangle.x}
                    y={rectangle.y}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={rectangle.fillColor}
                    height={rectangle.height}
                    width={rectangle.width}
                    draggable={isDraggable}
                    onClick={onClick}
                  />
                ))
              }

              {
                page.circles.map((circle) => (
                  <Circle
                  key={circle.id}
                  radius={circle.radius}
                  x={circle.x}
                  y={circle.y}
                  stroke={strokeColor}
                  strokeWidth={2}
                  fill={circle.fillColor}
                  draggable={isDraggable}
                  onClick={onClick}
                />
                ))
              }

              {
                page.arrows.map((arrow)=>(
                  <Arrow
                  key={arrow.id}
                  points={arrow.points}
                  stroke={strokeColor}
                  strokeWidth={2}
                  fill={arrow.fillColor}
                  draggable={isDraggable}
                  onClick={onClick}
                />
                ))
              }

              {
                page.scribbles.map((scribble)=>(
                  <Line
                  key={scribble.id}
                  lineCap="round"
                  lineJoin="round"
                  points={scribble.points}
                  stroke={strokeColor}
                  strokeWidth={2}
                  fill={scribble.fillColor}
                  draggable={isDraggable}
                  onClick={onClick}
                />
                ))
              }

            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </>
  );
}
