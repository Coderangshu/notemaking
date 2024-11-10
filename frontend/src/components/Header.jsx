import React, { useEffect, useState, useRef } from 'react';
import ThemeModeToggler from './ThemeModeToggler';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('username');
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
    <div className="bg-yellow-100 dark:bg-gray-900 dark:text-white font-lexend transition-colors duration-1000 sticky z-50 top-0 flex justify-between items-center px-4">
      <Link to="/">
        <div className="text-4xl py-8 font-bold">Notes.</div>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeModeToggler />
        {location.pathname !== '/login' && location.pathname !== '/signup' && (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown} 
              className="bg-blue-600 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center uppercase"
            >
              {localStorage.getItem("username").charAt(0)}
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

