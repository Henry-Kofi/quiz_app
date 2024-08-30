import jwt from "jsonwebtoken"
import "dotenv/config"

import { UserI,userModel } from "../../../model/user"

const secretKey = process.env.SECRET as string
const JWT = {
    secretKey:secretKey,
    jwtExp: "7d"
}

const generateToken = async(user:UserI) => {
    return jwt.sign({id:user._id,role:user.role,isVerified: user.isverified,isDisabled: user.isDisabled},JWT.secretKey,{
        expiresIn: JWT.jwtExp
    })
}

export {generateToken}