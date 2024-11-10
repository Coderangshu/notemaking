"use client";
import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./ThemeTogglerIcon";

const ThemeModeToggler = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  
  const Icon = () => {
    return theme === "light" ? <MoonIcon /> : <SunIcon />;
  };

  return (
    <>
      <button
        className="border-transparent focus:border-transparent focus:ring-100 "
        onClick={toggleTheme}
      >
        <Icon />
      </button>
    </>
  );
};
export default ThemeModeToggler;