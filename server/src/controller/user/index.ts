import { Response,Request } from "express"
import register from "./register"
import login from "./login"
import verify from "./verify"
import mail from "./mail"
import resetPassword from "./resetPassword"
import profile from "./profileupdate"
import getProfile from "./profileget"

export const Register =(req:Request,res:Response) => {
    register(req,res)
}

export const Login = (req:Request,res:Response) => {
    login(req,res)
}

export const Verify = (req:Request,res:Response) => {
    verify(req,res)
}

export const SendVerificationMail = (req:Request,res:Response) => {
    mail(req,res)
}

export const ResetPassword = (req:Request,res:Response) => {
    resetPassword(req,res)
}

export const Profile = (req: Request,res: Response) => {
    profile(req,res)
}

export const GetProfile = (req:Request,res:Response) => {
    getProfile(req,res)
}
