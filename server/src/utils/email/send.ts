import {createTransport} from "nodemailer"
import config from "../env"

const mailconfig = config()

const sendMail = async(reciever:string,message?: string,subject?:string,html?: string,text?:string) => {
    const transporter = createTransport({
        service:"gmail",
        auth:{
            user: mailconfig.email,
            pass: mailconfig.password
        }
    })
    
    const mailOption = {
        from: `Kofi<${mailconfig.email}>`,
        to: reciever,
        subject: subject,
        text: text,
        html: html
    }
    
    try {
        const mailed = await transporter.sendMail(mailOption)
        if(mailed.accepted){
            return "accepted"
        }
        if(mailed.pending){
            return "pending"
        }
        if(mailed.rejected){
            return "rejected"
        }
        return mailed.response
    } catch (error) {
        throw new Error("Mail: "+error)
    }
}

export default sendMail