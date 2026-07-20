import mongoose from "mongoose";
import Customer from "../models/customerModel.js";
import { compare } from "bcrypt";

export const createCustomer = async (req, res) => {
    try {

        const { name, email, phone, company, address, notes } = req.body;
        const owner = req.user.id;

        if(!name || !email || !phone ){
            return res.status(404).json({
                message:"provide mandetory details"
            })
        }

        const customer = await Customer.create({
            owner:owner,
            name,
            email,
            phone,
            company,
            address,
            notes,
        });


        return res.status(201).json(customer);
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getAllCustomer = async (req, res) => {
    try {

        const {search, page, limit} = req.query;

        const currentPage = Number(page) || 1;
        const perPage = Number(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const query = {
            owner:req.user.id,
        };

        if(search){
            query.$or = [
                {
                    name:{
                        $regex:search,
                        $options:"i",
                    },
                },
                {
                    email:{
                        $regex:search,
                        $options:"i",
                    },
                },
                {
                    phone:{
                        $regex:search,
                        $options:"i",
                    },
                },
                {
                    company:{
                        $regex:search,
                        $options:"i",
                    },
                },
            ]
        };


            const customer = await Customer.find(query)
            .skip(skip).limit(perPage).populate("owner","name email");

            const totalCustomers = await Customer.countDocuments(query);

            const totalPages = Math.ceil(totalCustomers/perPage);

        return res.status(200).json({
            message:"customers here", customer, currentPage, perPage, totalCustomers, totalPages
        });
        
        
    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }

}

export const getCustomer = async (req, res) => {
    try {
    
        const customer = await Customer.findById(req.params.id)

             if(!customer){
            return res.status(400).json({
                message:"customer not found"
            })
        }

        const owner = customer.owner.toString();

        if(owner !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        return res.status(200).json({
            message:"customers here", customer
        })

    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
    
        const customer = await Customer.findById(req.params.id)

             if(!customer){
            return res.status(400).json({
                message:"customer not found"
            })
        }

        const owner = customer.owner.toString();

        if(owner !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        await Customer.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message:"customers deleted", customer
        })

    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }
}

export const updateCustomer = async (req, res) => {
    try {
    
        const { name, email, phone, company, address, notes, status } = req.body;

        const customer = await Customer.findById(req.params.id)

        if(!customer){
            return res.status(400).json({
                message:"customer not found"
            })
        }

        const owner = customer.owner.toString();

        if(owner !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

         await Customer.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            company,
            address,
            notes,
            status,
            
        },
        { returnDocument: "after"});

        return res.status(200).json({
            message:"customers updated", customer
        })

    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }
}