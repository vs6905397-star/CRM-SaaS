import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    company:{
        type: String
    },
    address: {
        city: String,
        state: String,
        country: String
    },
    status:{
        type: String,
        enum: ["Lead", "Active", "In Active"],
        default: "Lead"
    },
    notes: {
        type: String
    }
    
},{timestamps: true})

const Customer = mongoose.model("Customer", customerSchema);

export default Customer