import * as jwt from "jsonwebtoken"
import userModel, { UserI } from "../../model/user"
import config from "../../utils/env"
class Token{
    async checkUser(_id: string) {
        try {
            const existingUser =await userModel.findById(_id)
            if(!existingUser){
                return false
            }
            return true
        } catch (error) {
            throw error
        }
    }
    private secret = config().tokenSecret
    generateToken = async (user:UserI) => {
        const token = jwt.sign({_id:user._id,email: user.email,role:user.role,isVerified: user.isVerified},this.secret,{
            expiresIn:"100d"
        })
        return token
    }
    verifyToken = async(token: string) => {
        try {
            const decodedToken = jwt.verify(token,this.secret) as UserI
            if(!decodedToken){
                return {success:false,message:"Access not granted"}
            }
            if(!decodedToken.isVerified){
                return {success: false, message: "user not verified"}
            }
            const userExists = this.checkUser(decodedToken._id)
            if(!userExists){
                return {success: false, message: "user does not exist"}
            }
            return {success: true, data: decodedToken}
        } catch (error) {
            throw error
        }
    }
}

const token = new Token()

export default token