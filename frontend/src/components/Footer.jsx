import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="bg-yellow-100/70 dark:bg-gray-900/80 dark:text-white backdrop-blur-lg font-lexend transition duration-1000 sticky z-5 bottom-0 py-4 flex justify-center items-center  font-normal px-20">
      <BiCopyright className="transition duration-1000"/> { year} The Dreaded Pirates
    </div>
  );
};

export default Footer;
