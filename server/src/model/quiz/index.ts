import { Schema,model,Document } from "mongoose";

interface QuestionI extends Document{
    _id: string;
    question: string;
    image:{
        filename: string,
        contentType: string,
        imageBase64: string
    },
    options:string[];
    answer: string[];
    isMultiple: boolean
}

const questionSchema = new Schema<QuestionI>({
    question:{
        type: String,
    },
    image:{
        filename:{
            type: String
        },
        contentType: {
            type: String
        },
        imageBase64: {
            type: String
        }
    },
    options:{
        type:[String]
    },
    answer:{
        type:[String]
    },
    isMultiple:{
        type: Boolean,
        default: false
    }
})

export interface QuizI extends Document{
    _id: string
    author_id: string
    category: string
    questions: QuestionI[]
    createdAt: Date
}

const quizSchema = new Schema<QuizI>({
    author_id:{
        type: String,
        ref: "users"
    },
    category: {
        type: String
    },
    questions: {
        type: [questionSchema]
    }
},{timestamps: true})

const quizModel = model<QuizI>("quizes",quizSchema);
export default quizModel;