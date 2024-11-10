import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import axios from "axios";

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const getTitle = (note) => {
  let title = note.body.split("\n")[0];
  if (title.length > 30) {
    return title.slice(0, 30);
  }
  return title;
};

let getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll(title, '');

  if (content.length > 45) {
    return content.slice(0, 55) + '...';
  } else {
    return content;
  }
}

const ListItem = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios.delete(`/api/note/${noteId}/`).then(() => {
        onDelete(noteId); // Remove the card after deletion
        navigate("/");
      });
    }
  };

  return (
    <>
      {note ? (
        <div className="text-lg aspect-square rounded hover:bg-slate-900 relative">
          <Link to={`/note/${note.id}`}>
            <section className="p-3 md:p-5 h-full flex flex-col justify-between">
              <section>
                <section className="text-base md:text-lg">{getTitle(note)}</section>
                <section className="text-sm md:text-base text-gray-800 mt-1 md:mt-3">{getContent(note)}</section>
              </section>
              <section className="text-xs md:text-sm text-gray-700">{moment(note.updated).fromNow()}</section>
            </section>
          </Link>
          <button
            onClick={() => handleDelete(note.id)}
            className="absolute bottom-3 right-3 text-red-500 text-xl"
          >
            <MdDelete />
          </button>
        </div>
      ) : (
        <div className="text-lg text-center text-white">
          No notes present
        </div>
      )}
    </>
  );
};

export default ListItem;

