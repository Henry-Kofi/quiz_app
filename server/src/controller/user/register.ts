import { Request, Response } from "express";
import response from "../../utils/response";
import userModel from "../../model/user";
import encrypt from "../../utils/passwordhash";
import authScheduler from "../helpers/authscheduler";
import generateOtp from "../helpers/otpgenerator";

const register = async(req:Request,res:Response) =>{
    const {email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email})
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

        const scheduleEvent = await authScheduler.schedule(newUser._id,newUser.email,newUser.otpCode)
        if(scheduleEvent === false){
            return response.unsuccess(res,400,"could not sent otp to email")
        }
        // const sendmail = await sendMail(email,"Test","Test subject",otpTemplate("123456"))
        // console.log(sendmail)
        
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