import {Schema,model,Document} from "mongoose";

export interface UserI extends Document{
    _id: string
    displayName: string
    email: string
    password: {
        salt:string
        password: string
    }
    image:{
        filename: string
        contentType: string
        imageBase64: string
    }
    isVerified: boolean
    lastActivity:number
    otpCode: string
    role: string
    createdAt: Date
}

const userSchema = new Schema<UserI>({
    displayName:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        salt:{
            type: String,
        },
        password:{
            type: String
        }
    },
    image:{
        filename: {
            type: String
        },
        contentType: {
            type: String
        },
        imageBase64: {
            type: String
        }
    }
    ,
    isVerified:{
        type: Boolean,
        default: false
    },
    lastActivity:{
        type: Number
    },
    otpCode:{
        type: String
    },
    role:{
        type: String,
        enum: ["user","teacher","admin"],
        default: "user"
    }
},{timestamps: true})

const userModel = model<UserI>("users",userSchema)
export default userModel