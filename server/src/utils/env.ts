import "dotenv/config"

const config ={
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
}
export default config