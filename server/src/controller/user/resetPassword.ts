import { Request,Response } from "express";
import response from "../../utils/response";
import userModel from "../../model/user";
import encrypt from "../../utils/passwordhash";
import token from "../helpers/token";

const resetPassword = async (req:Request, res:Response) => {
    const {password,confirmpassword,email} = req.body;
    try {
        if(password !== confirmpassword){
            return response.unsuccess(res,400,"Passwords mismatch")
        }
        const existingUser  = await userModel.findOne({email: email,isVerified: true})
        if(!existingUser){
            return response.unsuccess(res,404,"User not found or account not verified")
        }
        const hashedPassword = await encrypt.generate(password)
        const updatedUser = await userModel.findByIdAndUpdate(existingUser._id,{
            password:{
                salt: hashedPassword.salt,
                password: hashedPassword.genHash
            }
        },{new:true})
        if(!updatedUser){
            return response.unsuccess(res,400,"Error updating user")
        }
        const newToken = await token.generateToken(existingUser)
        return res.status(200).json({
            success:true,
            message: "Login successful",
            user:{
                token: newToken,
                role: updatedUser.role
            }
        })
    } catch (error) {
        return response.unsuccess(res,500,"Internal server error")
    }
}

export default resetPassword