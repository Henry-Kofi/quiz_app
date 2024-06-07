import { Router } from "express";
import { Login, Register, Verify } from "../controller/user";

const AuthRoute = Router()

AuthRoute.post("/register",Register)
AuthRoute.post("/login",Login)
AuthRoute.put("/verify",Verify)

export default AuthRoute