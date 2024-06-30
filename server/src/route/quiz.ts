import { Router } from "express";
import { Add } from "../controller/quiz";

const QuizRoute: Router = Router();

QuizRoute.post("/add",Add);

export default QuizRoute;