import { Request,Response } from "express";
import response from "../../utils/response";
import token from "../helpers/token";
import userModel from "../../model/user";

const getProfile = async (req:Request,res:Response) => {
    const cookie = req.headers.cookie
    try {
        if(!cookie){
            return response.unsuccess(res,400,"Unauthorised access")
        }
        const validToken = await token.verifyToken(cookie)
        if(!validToken){
            return response.unsuccess(res,400,"Error updating profile")
        }
        if(!validToken.success){
            return response.unsuccess(res,400,validToken.message)
        }
        const user = await userModel.findById(validToken.data?._id)
        if(!user){
            return response.unsuccess(res,404,"User not found")
        } 
        const image = Buffer.from(user.image.imageBase64,"base64")

        res.set("Content-Type",`application/json`)
        return res.status(200).json({
            success: true,
            message: "Success loading profile",
            user:{
                name: user.displayName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                image: image
            }
        })
        Image
    } catch (error) {
        return response.unsuccess(res,500,"internal server error")
    }
}

export default getProfile