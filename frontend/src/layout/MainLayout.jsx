import React, { useState } from 'react';
import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children }) {
  // Sidebar open/close ki state jo dono components ko connect karegi
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* 1. Top Navbar */}
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        isSidebarOpen={isSidebarOpen} 
      />

      {/* 2. Responsive Side Drawer (Mobile Only) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 3. Dynamic Content Area */}
      {/* md:p-6 se badi screen par space badhega, p-4 se mobile par snug fit rahega */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 transition-all duration-300">
        {/* Yahan par jo bhi page render hoga (Table, Forms, etc.), wo dynamic aa jayega */}
        {children}
      </main>

    </div>
  );
}