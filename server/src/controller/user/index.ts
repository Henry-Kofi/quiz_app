import { Response,Request } from "express"
import register from "./register"
import login from "./login"
export const Register =(req:Request,res:Response) => {
    register(req,res)
}

export const Login = (req:Request,res:Response) => {
    login(req,res)
}