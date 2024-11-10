import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew, MdDelete, MdDone } from "react-icons/md";
import authAxios from "../services/AxiosInterceptor";

let getTime = (note) => {
  return new Date(note?.created).toLocaleDateString();
};

const NotePage = ({ refreshNotes }) => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getNote = (noteId) => {
    if (id === 'new') return
    authAxios.get(`/api/note/${noteId}/`).then((response) => {
      setNote(response.data);
    });
  };

  useEffect(() => {
    getNote(id);
  }, [id]);

  const createNote = async () => {
    authAxios.post(`/api/notes/`, note).then((response) => {
      refreshNotes();
      navigate("/");
    });
  };

  const updateNote = async (noteId) => {
    authAxios.put(`/api/note/${noteId}/`, note).then((response) => {
      refreshNotes();
      navigate("/");
    });
  };

  const deleteNote = (noteId) => {
    authAxios.delete(`/api/note/${noteId}/`).then((response) => {
      refreshNotes();
      navigate("/");
    });
  };

  const handleUpdate = () => {
    if (id !== 'new' && !note.body){
      deleteNote(id)
    }else if (id !== 'new'){
      updateNote(id);
    }else if (id === 'new' && note !== null){
      createNote()
    }
    navigate("/");
  };

  const handleNote = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };

  return (
    <div className="bg-transparent md:pt-2">
      <div className="flex justify-between items-center mb-5 md:my-4">
        <div
          onClick={handleUpdate}
          className="w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <MdArrowBackIosNew className="text-white text-xl " />
        </div>
        <div className="dark:text-white">{id !=='new' && getTime(note)}</div>
        {id === 'new' ? (<button
          onClick={handleUpdate}
          className="text-white py-2 px-3"
        >
          <MdDone/>
        </button>) : (<button
          onClick={() => deleteNote(id)}
          className="text-red-500 text-xl flex items-center cursor-pointer py-2 px-3"
        >
          <MdDelete/> 
        </button>)}
      </div>
      <textarea
        autoFocus
        placeholder="Write Something Here......"
        className=" dark:text-white bg-transparent w-full h-[70vh] outline-none border-none resize-none"
        value={note?.body}
        onChange={(e) => handleNote(e.target.value)}
      ></textarea>
    </div>
  );
};

export default NotePage;
