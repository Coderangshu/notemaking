import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="bg-yellow-100 dark:bg-gray-900 dark:text-white font-lexend transition-colors duration-1000 sticky z-5 bottom-0 py-4 flex justify-center items-center  font-normal">
      <BiCopyright /> { year} The Dreaded Pirates
    </div>
  );
};

export default Footer;
