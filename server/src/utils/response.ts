import { Request,Response } from "express";

class Responses {
    success(res:Response,code:number,message?:string,data?:any) {
        res.status(code).json({
            success: true,
            message: message,
            data: data
        })
    }
    unsuccess(res:Response,code:number,message?:string,data?:any) {
        res.status(code).json({
            success: false,
            message: message,
            data: data
        })
    }
}

const response = new Responses()
export default response