import { Response,Request } from "express"
import response from "../../utils/response"
import sendMail from "../../utils/email/send";
import otpTemplate from "../../utils/email/templates/otp";
import generateOtp from "../helpers/otpgenerator";
import userModel from "../../model/user";

const mail = async (req: Request, res: Response) => {
    const email = req.body.email;
    try {
        const code = generateOtp();
        const updatedUser = await userModel.findOneAndUpdate({email:email},{
            otpCode: code,
            lastActivity: Date.now()
        },{new:true})
        if(!updatedUser){
            return response.unsuccess(res,404,"User not found")
        }
        if(updatedUser.otpCode !== code){
            return response.unsuccess(res,400,"Error sending otp")
        }
        const sendOTP = await sendMail(email,"","OTP verification",otpTemplate(code))
        if(!sendOTP || !sendOTP.success){
            return response.unsuccess(res,400,"Could not sent otp, please try again after some time")
        }
        return response.success(res,200,"Otp sent to email")
    } catch (error) {
        return response.unsuccess(res,500,"Internal server error")
    }
}

export default mail