import React, { useEffect, useState, useRef } from 'react';
import ThemeModeToggler from './ThemeModeToggler';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        console.log(decodedToken.username);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    toggleDropdown();
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="duration-500 bg-yellow-100/70 dark:bg-gray-900/80 backdrop-blur-lg dark:text-white font-lexend sticky z-50 top-0 flex justify-between items-center px-20 will-change-auto ease-in-out">
      <Link to="/">
        <div className="text-4xl py-8 font-bold pacifico-regular">Notes.</div>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeModeToggler />
        {username && location.pathname !== '/login' && location.pathname !== '/signup' && (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown} 
              className="bg-blue-600 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center uppercase"
            >
              {username.charAt(0)}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow-lg py-2">
                <button 
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
};

export default Header;

