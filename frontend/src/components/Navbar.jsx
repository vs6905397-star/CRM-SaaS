import React, { useState } from 'react';
import {NavLink, Link} from "react-router-dom"
import {useSearch} from "../context/searchContext"

export default function Navbar({ onMenuClick, isSidebarOpen }) {

  const {search, setSearch} = useSearch();


  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Hamburger Menu (Mobile Only) & Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button - Visible only on small screens (md:hidden) */}
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition cursor-pointer"
            aria-label="Open Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo Branding */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <span className="text-white font-black text-lg">C</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              CRM<span className="text-blue-600 font-semibold text-base ml-0.5">SaaS</span>
            </span>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile, visible on desktop (md:flex) */}
          <div className="hidden md:flex items-center gap-1 ml-6 bg-gray-50 p-1 rounded-xl border border-gray-100">
            <NavLink to="/" end  className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-medium text-gray-900 rounded-lg" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white/60 rounded-lg"}
            >
              Deshboard
            </NavLink>
            <NavLink to="/customer"  className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-medium text-gray-900 rounded-lg" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white/60 rounded-lg"}>
              Customers
            </NavLink>
            <NavLink to="/tasks" className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-medium text-gray-900 rounded-lg" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white/60 rounded-lg"}>
              Tasks
            </NavLink>
          </div>
        </div>

        {/* Center: Search Bar - Hidden on mobile, visible on desktop */}
        <div className="flex-1 max-w-xs lg:max-w-md mx-4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Right Side: Profile Icon (Always Visible) */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center justify-center ring-2 ring-blue-50 shadow-sm cursor-pointer"><Link to="/profile">AK</Link>
          </div>
        </div>

      </div>
    </nav>
  );
}