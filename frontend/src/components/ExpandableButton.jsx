"use client"
import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { MdTextFields, MdGesture } from 'react-icons/md';

export default function ExpandableButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed right-8 md:right-20 bottom-8 z-50 flex items-center">
      <button
        className={`w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center transition-transform duration-300 ${
          isExpanded ? 'rotate-45' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="sr-only">Add</span>
      </button>
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
        isExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        <button
          className="w-10 h-10 rounded-full bg-green-500 text-white absolute -left-20 -top-6 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          <Link to="/note/new">
            <MdTextFields className="text-lg" />
          </Link>
          <span className="sr-only">Add text</span>
        </button>
        <button
          className="w-10 h-10 rounded-full bg-yellow-500 text-white absolute -left-14 -top-16 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
        >
          <Link to="/note/scribble/new">
            <MdGesture className="text-lg" />
          </Link>
          <span className="sr-only">Scribble</span>
        </button>
      </div>
    </div>
  )
}

