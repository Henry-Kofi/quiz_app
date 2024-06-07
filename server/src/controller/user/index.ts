import { Response,Request } from "express"
import register from "./register"
import login from "./login"
import verify from "./verify"
export const Register =(req:Request,res:Response) => {
    register(req,res)
}

export const Login = (req:Request,res:Response) => {
    login(req,res)
}

export const Verify = (req:Request,res:Response) => {
    verify(req,res)
}