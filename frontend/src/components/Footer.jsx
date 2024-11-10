import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="sticky z-5 bottom-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-1000 py-4 flex justify-center items-center  font-normal dark:text-white">
      <BiCopyright /> { year} The Dreaded Pirates
    </div>
  );
};

export default Footer;
