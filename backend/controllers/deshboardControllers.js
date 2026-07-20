import mongoose from "mongoose";
import Task from "../models/taskModel.js"
import Customer from "../models/customerModel.js"

export const deshboardCount = async (req, res) => {
    try {
        const owner = req.user.id;

        const totalTasks = await Task.countDocuments({owner});

        const totalCustomers = await Customer.countDocuments({owner});

        const pendingTasks = await Task.countDocuments({owner, status: "Pending"});

        const completeTasks = await Task.countDocuments({owner, status:"Completed"});

       return res.status(200).json({
        message:"counts here", totalTasks, completeTasks, totalCustomers, pendingTasks
       })
        
    } catch (error) {
        return res.status(500).json({
            message:error.mesage
        })
    }
}

export const deshboardData = async (req, res) => {
    try {
        const owner = req.user.id;

        const today = new Date();

        const tasks = await Task.find({owner,
             status: {$in: ["Pending", "In Progress"]},
             dueDate:{
                $gte: today
             }}).populate("customer", "name email")
             .sort({dueDate:1})
             .limit(5);

        const recentCustomers = await Customer.find({owner}).sort({createdAt: -1}).limit(5);

        const recentTasks = await Task.find({owner}).sort({dueDate: 1}).limit(5);

        return res.status(200).json({
            message:"duetasks here", tasks, recentCustomers, recentTasks
        })


    } catch (error) {
        return res.status(500).json({
            message:error.mesage
        })
    }
}