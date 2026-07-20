import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    status:{
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default:"Pending"
    },
    dueDate: {
        type: Date,
        required: true
    },
    completedAt:{
        type: Date,
        default: null
    },
   
},{timestamps: true})

const Task = mongoose.model("Task", taskSchema);

export default Task