import { body,validationResult,param,cookie } from "express-validator";
import { Request,Response,NextFunction } from "express";

interface ValidationError {
    status:number;
    message: number;
  }
  

export const registerValidator = [
    // for display name
    body("displayName")
        .not()
        .isEmpty()
        .withMessage({status: 401,message:"Name field must not be empty"}),

    // for email
    body("email")
      .not()
      .isEmpty()
      .withMessage({status: 401,message:"Email field must be non-empty"})
      .isEmail()
      .withMessage({status: 401,message:"Invalid email format"}),

    // for password
    body("password")
      .not()
      .isEmpty()
      .withMessage({status: 401,message:"Password field must be non-empty"})
      .isLength({ min: 8})
      .withMessage({status:404,message: "Length of password must be 8 and above"})
      .matches(/[A-Z]/)
      .withMessage({status:404,message: "Password must contain atleast one uppercase letter"})
      .matches(/[0-9]/)
      .withMessage({status:404,message: "Password must contain atleast one number"})
      .matches(/[^a-zA-Z0-9]/)
      .withMessage({status:404,message: "Password must contain atleast one symbol"}),
  
    verificationFunc,
  ];

  export const verifyValidator = [
    param("email")
        .not()
        .isEmpty()
        .withMessage({status: 401,message:"Email field must be non-empty"})
        .isEmail()
        .withMessage({status: 401,message:"Invalid email format"}),
    body("otpCode")
        .not()
        .isEmpty()
        .withMessage({status: 401,message:"otp field must be non-empty"})
        .isLength({max:6,min:6})
        .withMessage({status:401,message: "Lenght of otp must be 6"}),

    verificationFunc
  ]

  export const loginValidator =[
    // for email
    body("email")
      .not()
      .isEmpty()
      .withMessage({status: 401,message:"Email field must be non-empty"})
      .isEmail()
      .withMessage({status: 401,message:"Invalid email format"}),

    // for password
    body("password")
      .not()
      .isEmpty()
      .withMessage({status: 401,message:"Password field must be non-empty"}),
  
    verificationFunc,
  ]

  export const profileValidator =[

  ]

  function verificationFunc(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage: ValidationError = errors.array()[0].msg;
      return res.status(errorMessage.status).json({
        success:false,
        responseCode: errorMessage.message,
      });
    }
    next();
  }