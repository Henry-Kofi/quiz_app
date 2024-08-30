import {Request,Response} from "express"

import { userModel,UserI } from "../../model/user"
import {generateToken} from "./helpers/token"
import authScheduler from "./helpers/authscheduler"

export const Verify = async (req:Request,res:Response) => {
    const {otpCode} = req.body
    const {email} = req.params
    try {
        // check if user exists
        const existingUser: UserI | null = await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        // verify user now
        const verifyOtp = await authScheduler.verify(existingUser,otpCode)
        // verification unsuccessful
        if(!verifyOtp.success){
            return res.status(400).json({
                success: false,
                message: verifyOtp.message
            })
        }

        // generate token
        const token = await generateToken(existingUser) as string
        res.cookie("token",token,{expires: new Date(Date.now()+(12*1000*60*60))}) //expires in 12hrs
        return res.status(200).json({
            success: true,
            message: "Registeration successful",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}