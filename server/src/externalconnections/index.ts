import mongoose from "mongoose";
import config from "../utils/env";

const createExternalConnections =async() => {
    try {
        const mongoUrl = config().mongoUrl
        await mongoose.connect(mongoUrl)
    } catch (error) {
        throw new Error("External connections: "+error)
    }
}

export default createExternalConnections