import mongoose,{ model,Schema,Document } from "mongoose";

interface ImageI{
    filename:string
    contentType: string
    size: number
}
// user interface
export interface UserI {
    _id:string
    displayName: string
    email: string
    password: string
    image: ImageI
    isverified: boolean
    isDisabled: boolean
    otpCode: string
    role: string
    createdAt: Date
    updatedAt: Date
}

const imageSchema = new Schema<ImageI>({
    filename:{
        type:String
    },
    contentType:{
        type:String
    },
    size:{
        type:Number
    }
}) 

const userSchema = new Schema<UserI>({
    displayName:{
        type:String
    },
    email: {
        type:String
    },
    password:{
        type: String
    },
    image: imageSchema,
    isverified:{
        type:Boolean,
        default: false
    },
    isDisabled:{
        type: Boolean,
        default:false
    },
    otpCode:{type:String},
    role:{
        type: String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps: true})

// User model

export const userModel = model<UserI>("users", userSchema);