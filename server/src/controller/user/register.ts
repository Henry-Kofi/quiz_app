import { Request, Response } from "express";
import response from "../../utils/response";
import userModel from "../../model/user";
import encrypt from "../../utils/passwordhash";

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
            lastActivity: Date.now()
        })
        if(!newUser){
            return response.unsuccess(res,404,"Error creating account")
        }
        response.success(res,200,"Account submitted, check your mail for verification code to verify the email")
    } catch (error) {
        const message = "internal server error"
       response.unsuccess(res,500,message) 
    }
}

export default register