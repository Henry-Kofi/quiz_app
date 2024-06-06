import "dotenv/config"

const config = () => {
    try {
        
        
        const port= process.env.PORT
        const mongoUrl= process.env.MONGO_URL
        const email= process.env.EMAIL
        const password= process.env.PASSWORD

        if(!port || !mongoUrl || !email || !password){
            throw new Error("Env variables are undefined")
        }
        return {port,mongoUrl,email,password}
    } catch (error) {
        throw error
    }
}
export default config