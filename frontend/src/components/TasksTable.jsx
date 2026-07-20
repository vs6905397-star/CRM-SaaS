import React, { useState } from 'react';
import { deleteTask, updateTask } from "../services/taskApi"
import toast from 'react-hot-toast';

export default function TaskManager({tasks, fetchTasks, status, setStatus,  priority, setPriority}) {

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  // Task select karne ke liye
  const handleRowClick = (task) => {
    setSelectedTask(task);
    
  };
  // Edit Modal open karne ke liye
  const handleEditClick = () => {
    setEditFormData({ ...selectedTask });
    setIsEditing(true);
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Edit save karne ke liye
  const handleSaveEdit = async (e) => {
    try {
      e.preventDefault();
     await updateTask(selectedTask._id, editFormData);
     await fetchTasks();
    setSelectedTask(editFormData);
    setIsEditing(false);

    toast.success("Task Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Somthing  went wrong!");
    }
  };

  // Task delete karne ke liye
  const handleDeleteTask = async () => {

    try {
      if(window.confirm("you want to delete this Task ?")){
          await deleteTask(selectedTask._id);
          await fetchTasks();
          toast.success("Task deleted");

      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!");
    }
  };

  // Helper colors for badges
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-rose-100 text-rose-700 ring-rose-600/10';
      case 'High': return 'bg-amber-100 text-amber-800 ring-amber-600/10';
      default: return 'bg-sky-100 text-sky-800 ring-sky-600/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800';
      case 'In Progress': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className='md:flex justify-between flex-1 '>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Task Workspace</h1>
          <p className="mt-2 text-sm text-slate-500">All Active Tasks are here....</p>
        </div>
        <div className='flex gap-3 mb-2' >
          <div className="w-full max-w-xs">
      <label 
        htmlFor="status-select" 
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        Filter by Priority
      </label>
      
      <div className="relative">
        <select
          id="status-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-800 shadow-sm transition-all duration-200 ease-in-out hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
        >
          <option value="All" onClick={(e) => setPriority(e.target.value)}>All </option>
          <option value="High" onClick={(e) => setPriority(e.target.value)}>🔴 High Priority</option>
          <option value="Medium" onClick={(e) => setPriority(e.target.value)}>🟡 Medium Priority</option>
          <option value="Low" onClick={(e) => setPriority(e.target.value)}>🟢 Low Priority</option>
        </select>

        {/* Custom Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <svg 
            className="h-5 w-5 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  
          <div className="w-full max-w-xs">
      <label 
        htmlFor="status-select" 
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        Filter by Status
      </label>
      
      <div className="relative">
        <select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-800 shadow-sm transition-all duration-200 ease-in-out hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
        >
          <option value="All" onClick={(e) => setStatus(e.target.value)}>All Status</option>
          <option value="Pending" onClick={(e) => setStatus(e.target.value)}>⏳ Pending</option>
          <option value="In Progress" onClick={(e) => setStatus(e.target.value)}>🚀 In Progress</option>
          <option value="Completed" onClick={(e) => setStatus(e.target.value)}>✅ Completed</option>
        </select>

        {/* Custom Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <svg 
            className="h-5 w-5 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

        </div>

        </div>


        {/* Main Grid: Left List, Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Tasks Table (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-semibold text-lg text-slate-800">All Tasks</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="py-4 px-6">Task Title</th>
                    <th className="py-4 px-6">Due Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks?.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => handleRowClick(task)}
                      className={`cursor-pointer transition-all duration-200 hover:bg-indigo-50/40 ${
                        selectedTask?.id === task.id ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-900">{task.title}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        </td>
                    </tr>
                  ))}
                  {tasks?.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-slate-400">Koi task nahi bacha!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: Task Details (Span 5) */}
          <div className="lg:col-span-5">
            {selectedTask ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 sticky top-6">
                
                {/* Header Actions */}
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority} Priority
                  </span>
                  
                  {/* Edit & Delete Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditClick}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      Edit 
                    </button>
                    <button
                      onClick={() => handleDeleteTask()}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Details Body */}
                <h3 className="text-xl font-bold text-slate-900 mb-4">{selectedTask.title}</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedTask.description} </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Customer</label>
                      <div className="text-sm font-semibold text-slate-800">{selectedTask.customer?.name}</div>
                      <div className="text-sm font-semibold text-slate-800 overflow-auto ">{selectedTask.customer?.email}</div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Due Date</label>
                      <div className="text-sm font-semibold text-slate-800">{new Date(selectedTask.dueDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="pt-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Current Status</label>
                    <span className={`mt-1 inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>
                   {selectedTask.completedAt && (
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Complete Date</label>
                      <div className="text-sm font-semibold text-slate-800">{new Date(selectedTask.completedAt).toLocaleDateString()}</div>
                    </div>
                   )}
                   </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-400">
                Detail dekhne ke liye kisi task par click karein.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= EDIT MODAL FORM ================= */}
      {isEditing && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Edit Task</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-semibold">&times;</button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Description</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={editFormData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Priority</label>
                  <select
                    name="priority"
                    value={editFormData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Status</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}