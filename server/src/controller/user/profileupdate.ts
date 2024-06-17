import { Request,Response, request } from "express";
import response from "../../utils/response";
import token from "../helpers/token";
import userModel, { UserI } from "../../model/user";
import {v4 as uuidv4} from 'uuid'

const profile = async(req: Request,res: Response) => {
    const {displayName} = req.body
    const cookie = req.headers.cookie
    const file = req.file
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
        // correction ==> name and image when empty gives error
        if(!file && !displayName){
            return response.unsuccess(res,400,"Fields empty")
        }

        const updateData: Partial<UserI> ={}
        if(displayName){
            updateData.displayName = displayName
        }
        if(file){
            updateData.image = {
                filename: `profile-${uuidv4()}`,
                contentType: file?.mimetype,
                imageBase64: file?.buffer.toString('base64')
            }
        }
        const updatedUser: UserI | null = await userModel.findByIdAndUpdate(validToken.data?._id,updateData,{new: true})
        if(!updatedUser){
            return response.unsuccess(res,400,"Error updating profile")
        }
        return response.success(res,200,"Success updating profile")
    } catch (error) {
        return response.unsuccess(res,500,"Internal server error")
    }
}

export default profile