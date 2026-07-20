import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast"
import { createCustomer, deleteCustomer, updateCustomer, getCustomers } from '../services/customerApi';
import { createTask, getCustomerTask } from "../services/taskApi";
import Avatar from "../components/Avatar";

export default function CustomerManagement({customers, fetchCustomer, page, setPage, totalPage}) {

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [addTasks, setAddTasks] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [tasks, setTasks] = useState(null);

  // Form ke liye states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' ya 'edit'
  const [formData, setFormData] = useState({ name: '', email: '', company: '', address:{city:'', state:'', country:''}, value: '', phone: '', notes: '', status:'' });

  // Handle Detail Drawer Open
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };
console.log(page);
  // Open Add Form
  const handleAddClick = () => {
    setFormMode('add');
    setFormData({ name: '', email: '', company: '', address:'', phone: '', notes: '', status:'' });
    setIsFormOpen(true);
  };

  // Open Edit Form
  const handleEditClick = () => {
    setFormMode('edit');
    setFormData({ ...selectedCustomer }); // Purana data form me load karega
    setIsDrawerOpen(false); // Detail drawer ko band kar dega
    setIsFormOpen(true);
  };

  const handleTasks = async () => {
    setAddTasks(true);
    setIsFormOpen(false);
  }

  const handleDelete = async () => {
    try {
      if(window.confirm("you want to delete customer ?")){
          await deleteCustomer(selectedCustomer._id);
          fetchCustomer();
          setIsFormOpen(false);
          toast.success("customer deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!");
    }
  }

  const handleTaskSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await createTask({
        title,
        description,
        dueDate,
        customer: selectedCustomer._id,
      })

      fetchCustomer();
      toast.success("Task Added Successfully");

    } catch (error) {
       console.log(error);
      toast.error("Somthing went wrong!");
    }
    setAddTasks(false);
  }

  // Handle Form Submit (Add/Edit Logic)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        if(formMode === "add"){
          const res = await createCustomer(formData);
          fetchCustomer();
          setIsFormOpen(false);
        toast.success("customer created successfully");
    }
     else {
      // Edit mode logic
          const res = await updateCustomer(selectedCustomer._id, formData);
          //customer list refresh
          fetchCustomer();
          setIsFormOpen(false);
        toast.success("customer updated  successfully");
    }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!");
    }
    setIsFormOpen(false);
  };

  useEffect(() => {
    if(selectedCustomer?._id){
      getCustomerTask(selectedCustomer._id)
      .then((data) => setTasks(data.task));
    }
  },[selectedCustomer]);
  console.log(tasks)

  const getStatusClass = (status) => {
    switch (status) {
      case 'Lead': return 'bg-green-100 text-green-700';
      case 'Active': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
            <p className="text-sm text-gray-500">Manage your leads and clients details here.</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm cursor-pointer"
          >
            + Add Customer
          </button>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4">Name</th>
                <th className="p-4">Company</th>
                <th className="p-4">Status</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {customers?.customer?.map((customer) => (
                <tr 
                  key={customer.id}
                  onClick={() => handleRowClick(customer)}
                  className="hover:bg-blue-50/50 cursor-pointer transition"
                >

                  <td className="p-4 font-medium text-gray-900">
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
                    </td>
                  <td className="p-4 text-gray-500">{customer.company}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">
                    {customer.email}
                  </td>
                  <td className="p-4 text-right text-blue-600 hover:text-blue-800 font-medium text-xs">
                    View Profile
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backdrop for Drawer & Form Modal */}
      {(isDrawerOpen || isFormOpen) && (
        <div 
          onClick={() => { setIsDrawerOpen(false); setIsFormOpen(false); }}
          className="fixed inset-0 bg-black/40 transition-opacity duration-300 z-40" 
        />
      )}

      {/* Slide-over Detail Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedCustomer && (
          <div className="h-full flex flex-col justify-between">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 bg-gradient-to-br  rounded-xl text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                <Avatar name={selectedCustomer.name} />
                </div>
                <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                <p className="text-sm text-gray-500">{selectedCustomer.company}</p>
                </div>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 text-lg">✕</button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Email</label>
                <p className="text-sm font-medium text-gray-800 bg-gray-50 p-2.5 rounded-lg border border-gray-100">{selectedCustomer.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Phone</label>
                <p className="text-sm font-medium text-gray-800 bg-gray-50 p-2.5 rounded-lg border border-gray-100">{selectedCustomer.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Status</label>
                  <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${getStatusClass(selectedCustomer.status)}`}>{selectedCustomer.status}</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Email</label>
                  <p className="text-sm font-bold text-gray-900">{selectedCustomer.email}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Notes</label>
                <p className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 whitespace-pre-line">{selectedCustomer.notes}</p>
              </div>
              <div>
              <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Tasks related to {selectedCustomer.name}</label>

              {tasks?.length > 0 ? (
              tasks?.map((task) => (
                <div key={task?._id}>
                <p className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 whitespace-pre-line"><span className='text-gray-800 text-l font-semibold'>Title : </span>{task?.title} 
                <br /><span className='text-gray-800 text-l font-semibold'>Description :</span> {task?.description}
                <br /><span className='text-gray-800 text-l font-semibold'>Status :</span> {task?.status}
                <br /><span className='text-gray-800 text-l font-semibold'>Priority :</span> {task?.priority}</p>
                
                </div>
              ))) : (
                <p className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 whitespace-pre-line">No Task yet</p>
              )}
              </div>
            </div>

            <div onClick={handleTasks} className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button  className="flex-1 bg-blue-600 hover:bg-blue-900 text-white py-2 rounded-lg font-medium text-sm transition">
                Add Tasks 
              </button>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button onClick={handleEditClick} className="flex-1 bg-blue-600 hover:bg-blue-900 text-white py-2 rounded-lg font-medium text-sm transition">
                Edit Profile
              </button>
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-900 text-white py-2 rounded-lg font-medium text-sm transition">
                Delete Customer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden transform transition-all">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {formMode === 'add' ? 'Add New Customer' : 'Edit Customer Profile'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Customer Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Company *</label>
                <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. TechMahendra" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Status*</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. TechMahendra"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Active">Active</option>
                    <option value="In Active">In Active</option>
                  </select>
              </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="rahul@example.com" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="+91 98765..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
              
              </div>

               
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Notes / Remarks</label>
                <textarea rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Add custom notes here..."></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition">
                  {formMode === 'add' ? 'Save Customer' : 'Update Changes'}
                </button>
              </div>
            </form>
          </div>

         
        </div>
      )}

            {addTasks && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden transform transition-all">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                Add Tasks related to customer
              </h3>
              <button onClick={() => setAddTasks(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            
            <form onSubmit={handleTaskSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Due Date</label>
                <input type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. TechMahendra" />
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Description</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Add custom notes here..."></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setAddTasks(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition">
                 Add Task
                </button>
              </div>
            </form>
          </div>

         
        </div>
      )}
 <div class="flex items-center justify-center py-8">
  <nav class="isolate inline-flex -space-x-px rounded-xl bg-white shadow-sm ring-1 ring-inset ring-gray-200" aria-label="Pagination">
    
    
    <button  onClick={()=>setPage(page-1)} disabled={page===1} class="relative inline-flex items-center rounded-l-xl px-4 py-3 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
      <span class="sr-only">Previous</span>

      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 010 1.06L8.06 10l3.72 3.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clip-rule="evenodd" />
      </svg>
    </button>

     {Array.from({ length: totalPage },
        (_, index)=>(
          <button key={index} onClick={()=>setPage(index + 1)} aria-current="page" className={`relative z-10 inline-flex items-center  px-4 py-3 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${page === index +1 ? "bg-indigo-600 text-white" : "bg-white text-black"} focus-visible:outline-indigo-600`}>{index + 1}</button>
          
        )
      )}
   
    <button onClick={()=>setPage(page+1)} disabled={page == totalPage} class="relative inline-flex items-center rounded-r-xl px-4 py-3 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
      <span class="sr-only">Next</span>

      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clip-rule="evenodd" />
      </svg>
    </button>

  </nav>
</div>
    </div>
  );
}