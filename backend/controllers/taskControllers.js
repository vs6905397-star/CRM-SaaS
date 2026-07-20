import mongoose from "mongoose"
import Task from "../models/taskModel.js"
import Customer from "../models/customerModel.js";

export const createTask = async (req, res) => {
    try {
        const {title, description, dueDate} = req.body;

        const owner = req.user.id;
        const customer = await Customer.findById(req.body.customer);
 
        if(!title || !description || !dueDate || !owner || !customer){
            return res.status(400).json({
                message:"plese provide all information related to task"
            });
        }

        if(customer.owner.toString() !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            });
        }

        const task = await Task.create({
            owner,
            customer: customer._id,
            title,
            description,
            dueDate
        })

        return res.status(200).json({
            message:"task created",task
        });


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }

}

export const getAllTask = async (req, res) => {
    try {

        const {status, priority} = req.query;

        const query = {owner: req.user.id};

        if(status){
            query.status = status;
        }

        if(priority){
            query.priority = priority;
        }

        const task = await Task.find(query)
        .populate("owner","name email")
        .populate("customer", "name email ");

        return res.status(200).json({
            message:"tasks here", task
        })
        
    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return  res.status(400).json({
                message:"task not found"
            });
        }
        
        const owner = task.owner.toString();

        if(owner !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        return res.status(200).json({
            message:"task here", task
        });

    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return  res.status(400).json({
                message:"task not found"
            });
        }

        const owner = task.owner.toString();

        if(owner !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        await Task.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message:"task deleted"
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const updateTask = async (req, res) => {
    try {
        const {title, description, dueDate, priority, status, } = req.body;

        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(400).json({
                message:"task not found"
            })
        }

        if(status === "Completed"){
            req.body.completedAt = new Date();
        } else {
            req.body.completedAt = null;
        }

        const owner = task.owner.toString();

        if(owner !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        await Task.findByIdAndUpdate(req.params.id, {
            title,
            description,
            dueDate,
            priority,
            status,
            completedAt: req.body.completedAt,
        },{
            returnDocument: "after"
        });

        return res.status(200).json({
            message:"task updated", task
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getCustomerTask =  async(req, res) => {

    try {
        const task = await Task.find({
            owner: req.user.id,
            customer: req.params.id
        }).populate("customer", "name email")
        .populate("owner", "name email");

        return res.status(200).json({
            task
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}