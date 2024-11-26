import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdTextFields, MdGesture } from 'react-icons/md';

const AddNoteButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="fixed right-20 bottom-12 z-50 flex items-center">
      {isPopupOpen && (
        <div className="flex flex-row-reverse items-center space-x-reverse space-x-2">
          <Link
            to="/note/new"
            className="bg-gray-100 text-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-200 flex items-center space-x-2 transition-colors duration-300"
          >
            <MdTextFields className="text-lg" />
            <span>Text</span>
          </Link>
          <Link
            to="/note/scribble/new"
            className="bg-gray-100 text-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-200 flex items-center space-x-2 transition-colors duration-300"
          >
            <MdGesture className="text-lg" />
            <span>Scribble</span>
          </Link>
        </div>
      )}
      <button
        onClick={togglePopup}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        <MdAdd className="text-2xl" />
      </button>
    </div>
  );
};

export default AddNoteButton;
