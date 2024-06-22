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
            console.log("mail sent");
            return {success: true,message:"accepted"}
        }
        if(mailed.pending){
            console.log("mail pending")
            return {success:false,message:"pending"}
        }
        if(mailed.rejected){
            console.log("mail rejected")
            return {success: false, message:"rejected"}
        }
    } catch (error) {
        throw new Error("Mail: "+error)
    }
}

export default sendMail