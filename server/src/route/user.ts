import { Router } from "express";
import { Login, Register } from "../controller/user";

const AuthRoute = Router()

AuthRoute.post("/register",Register)
AuthRoute.post("/login",Login)

export default AuthRoute