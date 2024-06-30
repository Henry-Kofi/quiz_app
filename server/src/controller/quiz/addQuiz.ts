import { Request, Response } from "express";
import response from "../../utils/response";
import token from "../helpers/token";

const add = async (req:Request,res:Response) => {
    const cookie = req.headers.cookie;
    const questions = req.body.questions;
    const files = req.files
    try {
        if(!cookie){
            return response.unsuccess(res,400,"Unauthorised access")
        }
        const validToken = await token.verifyToken(cookie);
        if(!validToken){
            return response.unsuccess(res,400,"Error updating profile")
        }
        if(!validToken.success){
            return response.unsuccess(res,400,validToken.message)
        }
        if(validToken.data?.role !== "teacher"){
            return response.unsuccess(res,401, "You are not qualified to upload questions")
        }
        if(!questions || questions.length < 1){
            return response.unsuccess(res,400,"Please upload atleast 5 questions")
        }
        return res.status(200).json({
            success: true,
            message: "Success uploading questions",
            questions
        })
    } catch (error) {
        response.unsuccess(res,500,"Internal server error")
    }
}

export default add;