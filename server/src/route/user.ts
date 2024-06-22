import { Router } from "express";
import { GetProfile, Login, Profile, Register, ResetPassword, SendVerificationMail, Verify } from "../controller/user";
import { upload } from "../middleware/user";

const AuthRoute = Router()

AuthRoute.post("/register",Register)
AuthRoute.post("/login",Login)
AuthRoute.put("/verify",Verify)
AuthRoute.put("/verification/mail",SendVerificationMail)
AuthRoute.put("/reset/password",ResetPassword)
AuthRoute.put("/profile/update",upload.single("file"),Profile)
AuthRoute.get("/profile/get",GetProfile)

export default AuthRoute