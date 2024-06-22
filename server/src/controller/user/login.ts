import { Request, Response } from "express";
import response from "../../utils/response";
import userModel from "../../model/user";
import encrypt from "../../utils/passwordhash";
import token from "../helpers/token";

const login  = async (req:Request,res:Response) => {
    const {email,password} = req.body
    try {
        // TODO ==> create a class funkction that verifies the user email
        // check isVerified
        // check if token is valid by creating a token validator and generator
        // and for the if token is valid, check the database if it verified
        // if !verified, send otp to the mail for validation again 
        const existingUser = await userModel.findOne({email:email})
        if(!existingUser){
            return response.unsuccess(res,404,"User not found")
        }
        const validPassword = await encrypt.validate(password,existingUser.password.password,existingUser.password.salt)
        if(!validPassword){
            return response.unsuccess(res,400,"Invalid email or password")
        }
        const newToken = await token.generateToken(existingUser)
        return res.status(200).json({
            success:true,
            message: "Login successful",
            user:{
                token: newToken,
                role: existingUser.role
            }
        })
    } catch (error) {
        const message = "internal server error"
       response.unsuccess(res,500,message)
    }
}

export default login