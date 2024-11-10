import React from 'react'
import ThemeModeToggler from "./ThemeModeToggler"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='sticky z-50 top-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-1000 flex justify-between items-baseline'>
      <Link to='/'>
        <div className='dark:text-white text-4xl py-8 font-bold'>Notes.</div>
      </Link>
      <div className="ml-5 self-center text-xl">
        <ThemeModeToggler />
      </div>
    </div>
  )
}

export default Header
