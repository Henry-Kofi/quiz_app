import { Request,Response } from "express";
import * as bcrypt from 'bcryptjs'

import { UserI,userModel } from "../../model/user";
import { generateToken } from "./helpers/token";


export const Login = async (req:Request,res:Response) => {
    const {email,password} = req.body
    try {
        // check if email is in the database
        const existingUser = await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }
        // check if user account is enabled
        if(existingUser.isDisabled){
            return res.status(401).json({
                success: false,
                message: "User account disabled. Contact admin to enable account❓"
            })
        }
        // validate password
        const isValidPassword = await bcrypt.compare(password,existingUser.password)
        if(!isValidPassword){
            return res.status(404).json({
                success: false,
                message:"Invalid password❗"
            })
        }
        //  generate token code
        const token = await generateToken(existingUser) as string
        res.cookie("token",token,{expires: new Date(Date.now()+(12*1000*60*60))}) 

        return res.status(200).json({
            success: true,
            message: "✔Login successful"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}