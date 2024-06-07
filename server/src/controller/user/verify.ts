import response from "../../utils/response";
import authScheduler from "../helpers/authscheduler";
import { Request,Response } from "express";

const verify = async(req:Request,res:Response) => {
    const {otp,email} = req.body;
    try {
        const verify = await authScheduler.verifyOTP(otp,email)
        if(!verify || !verify.success){
            return response.unsuccess(res,400,verify.message)
        }
        // generate otp
        return response.success(res,200,"Account creation successful",verify.newToken)
    } catch (error) {
        return response.unsuccess(res,500,"Internal server error")
    }
}

export default verify