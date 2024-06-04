import express,{Application} from "express"
import * as http from "http"
import config from "./utils/env"
import createExternalConnections from "./externalconnections"
import AuthRoute from "./route/user"

const app: Application = express()
const server = http.createServer(app)

app.use(express.json())
// app.use(express.urlencoded)
app.use("/api/user",AuthRoute)

const port = config.port
if(!port){
    throw new Error("Port undefined"); 
}

createExternalConnections().then(() => startApp()).catch(error => console.error(error)
)

const startApp = () => {
    server.listen(port,() => {
        console.log(`Server running on port ${port}`);
        
    })
}
