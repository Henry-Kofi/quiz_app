import "dotenv/config"

const config = () => {
    try {
        
        
        const port= process.env.PORT
        const mongoUrl= process.env.MONGO_URL
        const email= process.env.EMAIL
        const password= process.env.PASSWORD
        const tokenSecret = process.env.SECRET

        if(!port || !mongoUrl || !email || !password || !tokenSecret){
            throw new Error("Env variables are undefined")
        }
        return {port,mongoUrl,email,password,tokenSecret}
    } catch (error) {
        throw error
    }
}
export default config