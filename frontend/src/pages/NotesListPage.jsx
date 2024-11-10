import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "../components/ListItem";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    axios.get("/api/notes/").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <div className="pb-16 pt-4 min-h-[80vh]">
    {notes.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 notes">
        {notes.map((note) => (
          <ListItem key={note.id} note={note} onDelete={handleDeleteNote} />
        ))}
      </div>
    ) : (
      <div className="text-lg text-center text-white">
        No notes available
      </div>
    )}
  </div>
  );
};

export default NotesListPage;
