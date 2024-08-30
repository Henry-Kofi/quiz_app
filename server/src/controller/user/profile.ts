import { Request,Response } from "express";

import { UserI,userModel } from "../../model/user";

export const Profile = async (req:Request,res:Response) => {
    const {displayName} = req.body;
    const image = req.file
    const token = req.headers.cookie as string
    try {
        const tokenJSON = token.split("=")[1]
        
        return res.status(200).json({
            success: true,
            message: "Success",
            token:tokenJSON
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}