import { Request, Response } from "express";
import response from "../../utils/response";
import userModel, { UserI } from "../../model/user";
import encrypt from "../../utils/passwordhash";
import authScheduler from "../helpers/authscheduler";
import generateOtp from "../helpers/otpgenerator";
import sendMail from "../../utils/email/send";
import otpTemplate from "../../utils/email/templates/otp";

const register = async(req:Request,res:Response) =>{
    const {email,password} = req.body;
    // console.log({
    //     email: email,
    //     password: password
    // })
    try {
        const existingUser: UserI | null = await userModel.findOne({email:email})
        if(existingUser){
            return response.unsuccess(res,400,"Email already in use")
        }
        
        const hashedPassword = await encrypt.generate(password)
        const newUser = await userModel.create({
            email: email,
            password:{
                salt: hashedPassword.salt,
                password: hashedPassword.genHash
            },
            lastActivity: Date.now(),
            otpCode: generateOtp()
        })
        if(!newUser){
            return response.unsuccess(res,404,"Error creating account")
        }
        
        const sendOtpToMail = await sendMail(email,"","OTP Verification",otpTemplate(newUser.otpCode))
        if(!sendOtpToMail){
            return response.unsuccess(res,400,"Error creating account")
        }
        if(!sendOtpToMail.success){
            return response.unsuccess(res,400,sendOtpToMail.message)
        }
        await authScheduler.schedule(newUser._id,newUser.email,newUser.otpCode)
        
        return response.success(res,200,"Account submitted, check your mail for verification code to verify the email")
    } catch (error: any) {
        console.log(error)
        if(error.message === "Mail: Error: No recipients defined"){
            return response.unsuccess(res,404,"Invalid email")
        }
        const message = "internal server error"
       response.unsuccess(res,500,message) 
    //    Error: Mail: Error: No recipients defined
    }
}

export default register