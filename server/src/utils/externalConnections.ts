import mongoose from "mongoose"
import "dotenv/config"

const createExternalConnection = async () => {
    try {
        const mongo_url = process.env.MONGO_URL as string
        await mongoose.connect(mongo_url)
    } catch (error) {
        throw new Error("External connections: "+error)
    }
}

export default createExternalConnection