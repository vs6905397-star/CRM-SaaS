import mongoose from "mongoose";
import User from "../models/userModel.js";

export const getUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");
        

        if(!user){
            return res.status(400).json({
            message: "user not found"
        });
        }

        return res.status(200).json({
            message:"User is found", user
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const {name} = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name },
            { returnDocument: "after" }
        );

        if(!user){
            return res.status(400).json({
                message:"invalid id"
            })
        }

        return res.status(200).json({
            message:"update successfully", user
        })
    } catch (error) {
         return res.status(500).json({
            message: error.message
        });
    }
}