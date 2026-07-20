import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext";
import Avatar from "../components/Avatar";

export default function Dashboard({data, count}) {

    const {user} = useAuth();
  // 3. Mock Data: Recent 5 Tasks & Pending/In-Progress Tasks
  const [tasks] = useState([
    { id: 101, title: 'Enterprise onboarding call', customer: 'TechMahendra', status: 'In Progress', priority: 'High' },
    { id: 102, title: 'Review subscription invoice', customer: 'Vertex Corp', status: 'Pending', priority: 'Medium' },
    { id: 103, title: 'Setup product walkthrough', customer: 'DesignCo', status: 'Completed', priority: 'Low' },
    { id: 104, title: 'Send contract renewal docs', customer: 'Kisna Gems', status: 'In Progress', priority: 'High' },
    { id: 105, title: 'Fix dashboard payment lag', customer: 'Internal', status: 'Pending', priority: 'High' },
  ]);

  // Filter tasks to show only Pending or In-Progress
  const activeTasks = tasks.filter(task => task.status === 'Pending' || task.status === 'In Progress');

  // Priority color helper
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-100';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  // Status color helper
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="space-y-8 py-2 max-w-7xl mx-auto">
      
      {/* Welcome / Header Section */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back, {user?.user.name}!</h1>
        <p className="text-sm text-gray-500">Here's what is happening with your CRM today.</p>
      </div>

      {/* Stats Counter Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Card 1: Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Customers</p>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-1">{count?.totalCustomers
}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>

        {/* Card 2: Total Tasks */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Tasks</p>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-1">{count?.totalTasks
}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
        </div>

        {/* Card 3: Completed Tasks */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed Tasks</p>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-600 mt-1">{count?.completeTasks}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>

        {/* Card 4: Pending Tasks */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Tasks</p>
            <h3 className="text-2xl md:text-3xl font-black text-amber-600 mt-1">{count?.pendingTasks}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

      </div>

      {/* Main Two-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Tasks Section (Left Side - Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section: Actionable / Pending Tasks */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Active Pipeline Tasks</h2>
                <p className="text-xs text-gray-400">Tasks that currently need immediate action (Pending / In Progress).</p>
              </div>
              <span className="bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-100">
                {activeTasks.length} Remaining
              </span>
            </div>

            {/* Tasks List Layout */}
            <div className="divide-y divide-gray-100">
              {data?.tasks?.map((task) => (
                <div key={task.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 group">
                  <div className="flex items-start gap-3">
                    {/* Status Dot Ring */}
                    <span className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${task.status === 'In Progress' ? 'bg-blue-500 ring-4 ring-blue-50' : 'bg-amber-400 ring-4 ring-amber-50'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Client: <span className="text-gray-600 font-semibold">{task.customer.name}</span><br />
                      <span className="text-gray-600 font-semibold">{task.customer.email}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-md font-medium border ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: All 5 Current Added Tasks (Mini Table) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Task Feed</h2>
              <p className="text-xs text-gray-400">Overview of the last 5 logs created in the system.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs font-bold border-b border-gray-100 pb-2">
                    <th className="pb-3 font-semibold">Task Description</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {data?.recentTasks?.map((task) => (
                    <tr key={task.id} className="text-gray-700 hover:bg-gray-50/40 transition">
                      <td className="py-3 pr-2">
                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[220px] sm:max-w-xs">{task.title}</p>
                      </td>
                      <td className="py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Column 3: Current Added Customers (Right Side Sidebar Layout) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs h-fit">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">Newest Customers</h2>
            <p className="text-xs text-gray-400">The latest 5 clients added to your SaaS database.</p>
          </div>

          <div className="space-y-4">
            {data?.recentCustomers?.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  {/* Dynamic Gradient Avatar */}
                  <div className={`h-10 w-10 bg-gradient-to-br ${customer.bg} rounded-xl text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                    <Avatar name={customer.name} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">{customer.name}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{customer.email}</p>
                  </div>
                </div>
                {/* Time badge */}
                <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                  {new Date(customer?.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>

          {/* Quick View Button */}
          <Link to="/customer">
          <button className="w-full mt-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition shadow-xs cursor-pointer">
            View All Customers
          </button></Link>
        </div>

      </div>

    </div>
  );
}