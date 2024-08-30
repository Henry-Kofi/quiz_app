import {createTransport} from 'nodemailer'
import 'dotenv/config'

interface MailI {
    from: string
    to:string
    subject: string
    html: string
}

const email = process.env.EMAIL
const password = process.env.PASSWORD

const sendMail = async (reciever:string,subject: string,html:string) => {
    const transporter = createTransport({
        service:"gmail",
        auth:{
            user: email,
            pass: password
        }
    })
    
    const mailOption: MailI={
        from: `preferred name<${email}>`,
        to: reciever,
        subject: subject,
        html:html
    }

    try {
        await transporter.sendMail(mailOption)
    } catch (error) {
        throw new Error("Mail error: "+error)
    }
}

export default sendMail;