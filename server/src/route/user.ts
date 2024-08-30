import {Router} from 'express'
import { Register } from '../controller/user/register'
import {loginValidator, registerValidator, verifyValidator} from "../middleware/validator/user"
import { Verify } from '../controller/user/verify';
import { Login } from '../controller/user/login';
import { profileUpload } from '../middleware/storage';
import { Profile } from '../controller/user/profile';

const AuthRoute: Router = Router()

AuthRoute.post('/register',registerValidator,Register);
AuthRoute.post("/verify/:email",verifyValidator,Verify);
AuthRoute.post("/login",loginValidator,Login);
AuthRoute.put("/profile",profileUpload.single('image'),Profile)

export default AuthRoute