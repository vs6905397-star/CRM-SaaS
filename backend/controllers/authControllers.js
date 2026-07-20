import mongoose from "mongoose";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

export const singup = async (req, res) => {
    try {

        const {name, email, password} = req.body;

        //validation

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        }

        //check existing user

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //jwt token
        const token = generateToken(user._id);

        //set cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,

        });

        //hide password
        user.password = undefined;

        return res.status(201).json({
            success: true,
            message: "Account created", user
        });
        
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
             return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Create Account first",
            });
        }

         const isMatch = await bcrypt.compare(password, user.password)

         if(!isMatch){
            return res.status(404).json({
                success: false,
                message:"invalid input"
            });
         }

         const token = generateToken(user._id);

         res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
         })

         return res.status(200).json({
            success: true,
            message: "Login Successfully",user
         });


    } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req, res) => {
     try {
       res.cookie("token",  {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
         })

        return res.status(200).json({
            message: "Logout successfully"
        });
        
     } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        });
     }
}
