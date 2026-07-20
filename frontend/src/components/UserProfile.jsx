import React, { useState } from 'react';
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { updateUser } from '../services/authApi';
import Avatar from "../components/Avatar";

export default function ProfilePage() {
  const { logout } = useAuth();
  const {user} = useAuth();
  const {checkAuth} = useAuth();

  const navigate = useNavigate();
  // Edit Mode Toggle States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save
  const handleSave = async(e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
     checkAuth();
    toast.success("User Name updated");
    setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!");
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setFormData({ ...user }); // Purane data pe revert karega
    setIsEditing(false);
  };

  // Handle Logout (Tujhe jahan redirect karna ho ya token clear karna ho)
  const handleLogout = async () => {
    try {
      await logout();
     toast.success('Logging out...');
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 animate-fade-in">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500">Manage your profile details and preferences.</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Banner Profile Header background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative"></div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 relative">
          
          {/* Avatar Area */}
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-xl font-semibold flex items-center  justify-center border-4 border-white shadow-md">
                 <Avatar name={user?.user?.name} />
            </div>
            
            {/* Action Buttons (Top Right) */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          {/* Dynamic Form for View / Edit */}
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all bg-white text-gray-800 font-medium"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-base font-semibold text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-gray-100">{user?.user?.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Email Address</label>
                <p className="text-base font-medium text-gray-600 bg-gray-50/50 p-3 rounded-xl border border-gray-100">{user?.user?.email}</p>
            </div>

            {/* Bottom Controls / Action Section */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              
              {isEditing ? (
                // Buttons visible only in Edit Mode
                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-100 transition"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                // Logout Button visible only in Normal Mode
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log out
                </button>
              )}
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}