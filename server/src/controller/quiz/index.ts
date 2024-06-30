import { Request,Response } from "express";
import add from "./addQuiz";

export const Add = (req:Request,res:Response) => {
    add(req,res)
}