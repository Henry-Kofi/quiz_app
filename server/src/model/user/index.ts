import {Schema,model,Document} from "mongoose";

export interface UserI extends Document{
    _id: string
    displayName: string
    email: string
    password: {
        salt:string
        password: string
    }
    isVerified: boolean
    lastActivity:number
    otpCode: string
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
            type: String
        },
        password:{
            type: String
        }
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    lastActivity:{
        type: Number
    },
    otpCode:{
        type: String
    }
},{timestamps: true})

const userModel = model<UserI>("users",userSchema)
export default userModel