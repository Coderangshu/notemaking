import React from "react";
import { BiCopyright } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="sticky z-50 bottom-0 bg-yellow-100 dark:bg-gray-900 transition-colors duration-1000 py-4 flex justify-center items-center  font-normal dark:text-white">
      <BiCopyright /> { year} The Dreaded Pirates
      <button
        className="absolute right-5 -top-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
      <Link className="h-full w-full" to={`/note/new`}>
          <MdAdd className="text-2xl" />
      </Link>
      </button>
    </div>
  );
};

export default Footer;
