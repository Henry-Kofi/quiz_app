import { Response,Request } from "express";
import * as encrypt from "bcryptjs"

import authScheduler from "./helpers/authscheduler";
import { userModel, UserI } from "../../model/user";
import generateOtp from "../util/otpGenerator";

export const Register = async(req: Request, res: Response) => {
    const { displayName, email, password }:{displayName:string,email:string,password:string} = req.body;
    try {
        // check if user already exists
    const existingUser: UserI | null = await userModel.findOne({ email: email})
    // user exists, notify client and stop execution
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }
    // there is no record of the user
    // hash password now
    const hashedPassword = await encrypt.hash(password,12)

    // generate OTP code
    const otpCode = await generateOtp()
    // add the user info to the database
    const newUser = await userModel.create({
        displayName: displayName,
        email:email,
        password: hashedPassword,
        otpCode: otpCode 
    })
// if info is not successfully added, notify client and stop execution
    if(!newUser){
        return res.status(400).json({
            success: false,
            message: "Failed to create user"
        });
    }
// if successful send a verification otp to users email for verification
    await authScheduler.schedule(newUser)

    return res.status(200).json({
        success: true,
        message: "Success creating user. Check your mail for otp verification code",
        user: newUser
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
