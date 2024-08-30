import express,{Application} from 'express'
import {Server,createServer} from 'node:http'
import 'dotenv/config'


import createExternalConnection from './utils/externalConnections'
import AuthRoute from './route/user'

const app: Application = express()
const server: Server = createServer(app)

app.use(express.json());


app.use("/api/users",AuthRoute)
const port = process.env.PORT

createExternalConnection().then(() => startApp()).catch(error => console.log(error))

const startApp = () => {
  server.listen(port,()=>{
    console.log(`Server listening on ${port}`)
  })
}

