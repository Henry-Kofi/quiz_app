import multer from "multer"
import path from "path"
import {v4 as uuidv4} from "uuid"
import { Request,Response,Express } from "express"

const profileStorage = multer.diskStorage({
    destination: function(req:Request,file:Express.Multer.File,cb:CallableFunction){
        cb(null, path.join(__dirname,'..','..','public','profile'))
    },
    filename(req:Request, file:Express.Multer.File, cb:CallableFunction) {
        const extension: string = path.extname(file.originalname);
        const fileName: string = "profile_"+Date.now().toString()+"_"+uuidv4()+extension;
        cb(null,fileName)
    },
})

const profileUpload = multer({
    storage: profileStorage,
    limits:{
        fileSize: 2*1024*1024 //2mb
    }
})

export {profileUpload}