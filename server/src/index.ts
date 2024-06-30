import express,{Application} from "express"
import * as http from "http"
import config from "./utils/env"
import createExternalConnections from "./externalconnections"
import AuthRoute from "./route/user"
import QuizRoute from "./route/quiz"
// import

const app: Application = express()
const server = http.createServer(app)

app.use(express.json())
// app.use(config)
app.use("/api/user",AuthRoute)
app.use("/api/quiz/",QuizRoute);

const port = config().port

createExternalConnections().then(() => startApp()).catch(error => console.error(error)
)

const startApp = () => {
    server.listen(port,() => {
        console.log(`Server running on port ${port}`);
        
    })
}
