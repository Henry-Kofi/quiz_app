import userModel, { UserI } from "../../model/user"
import sendMail from "../../utils/email/send"
import otpTemplate from "../../utils/email/templates/otp"
import token from "./token"

class AuthScheduler{
    fiveMinutes = 5 * 60 * 1000
    mailHeading = "Verification Otp"

    schedule = async (_id: string,email: string,otp:string) => {
        try {
            const sendOtpToMail = await sendMail(email,"",this.mailHeading,otpTemplate(otp))
            if(sendOtpToMail == "rejected"){
                return false
            }
            setTimeout(() => {
                this.deleteUser(_id)
            },this.fiveMinutes)
        } catch (error) {
            throw error
        }
    }
    verifyOTP = async (otpCode: string,email: string) => {
        try {
            const user = await userModel.findOne({email: email})
            if(!user){
                return {success: false, message: "user not found"}
            }
            if(user.isVerified){
                return {success: true, message: "Account already verified"}
            }
            if(Date.now() - user.lastActivity > this.fiveMinutes){
                return {success: false, message: "verification code has expired"}
            }
            if(otpCode !== user.otpCode){
                return {success: false, message: "invalid otp"}
            }
            const updatedUser = await userModel.findOneAndUpdate({email: email},{
                isVerified:true,
                lastActivity: Date.now()
            },{new:true})
            if(!updatedUser || !updatedUser.isVerified){
                return {success: false, message: "Verification failed"}
            }
            const newToken = await token.generateToken(user)
            return {success: true, message: "otp verification success",newToken}
        } catch (error) {
            throw error
        }
    }

    private deleteUser = async (_id: string) => {
        try {
            const verifiedUser = await userModel.findById(_id,{isVerified:true})
            if(!verifiedUser || !verifiedUser.isVerified){    
                const deletedUser = await userModel.findByIdAndDelete(_id)
                if(!deletedUser){
                    console.warn("User not deleted \n Reason: User does not exist");
                }
                console.warn("User account deleted \n Reason: Verification timeout exceeded");
            }
            return
        } catch (error) {
            throw error
        }
    }
}

const authScheduler = new AuthScheduler()

export default authScheduler;