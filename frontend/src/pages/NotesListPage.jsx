import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import authAxios from '../services/AxiosInterceptor';
import AddNoteButton from '../components/AddNoteButton';


const NotesListPage = ({ refreshList, refreshNotes }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    authAxios.get("/api/notes/").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    getNotes();
  }, [refreshList]);

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    refreshNotes();
  };

  return (
    <div className="pb-16 pt-4 min-h-[80vh]">
      {notes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 notes">
          {notes.map((note) => (
            <ListItem key={note.id} note={note} onDelete={handleDeleteNote} refreshNotes={refreshNotes} />
          ))}
        </div>
      ) : (
        <div className="text-lg text-center">
          No notes available
        </div>
      )}
        <AddNoteButton/>
  </div>
  );
};

export default NotesListPage;
