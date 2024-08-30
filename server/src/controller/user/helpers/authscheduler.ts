import { UserI,userModel } from "../../../model/user";
import sendMail from "../../../utils/email/mailer";
import otpTemplate from "../../../utils/email/otpTemplate";

class AuthScheduler{
    private fiveminutes = 5*60*1000

    schedule = async (user:UserI) => {
        try {
            const subject = "Otp verification"
            // send mail
            const mailed = await sendMail(user.email,subject,otpTemplate(user.otpCode))
            setTimeout(() => {
                this.deleteUser(user)
            },this.fiveminutes)
        } catch (error) {
            throw new Error("Scheduler error: "+ error)
        }
    }

    verify = async(user:UserI,otpCode: string) => {
        try {
            // check if otp has expired
            if(Date.now()-new Date(user.createdAt).getTime() >= this.fiveminutes){
                return {success: false, message: "Verification code expired"}
            } 
            // check if otp is valid
            if(otpCode !== user.otpCode){
                return {success: false, message: "Invalid verification code"}
            }
            // update user
            const updatedUser: UserI | null = await userModel.findByIdAndUpdate(user._id,{
                isverified:true,
                otpCode: null
            },{new:true})

            if(!updatedUser){
                return {success: false, message: "Could not update user"}
            }
            return {success: true, message: "success"}
        } catch (error) {
            throw new Error("Verification error: "+error)
        }
    }

    private deleteUser = async (user:UserI) => {
        try {
            const verifiedUser = await userModel.findOne({email:user.email,isverified:true})
            if(!verifiedUser){
                await userModel.findByIdAndDelete(user._id)
                console.log("user deleted")
            }
            return
        } catch (error) {
            throw error
        }
    }
}

const authScheduler = new AuthScheduler();

export default authScheduler;