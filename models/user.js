import mongoose from "mongoose";


const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
 
    },
    members: {
        type: String, 
   
    },
    score: {
        type: Number,
        default: 0
    }
});


const QuizSchema = new mongoose.Schema({
    title: {
        type: String
    },
    cordinator: {
        name: String
    },
    teams: [TeamSchema],
    winner: {
        type: [String],
        default: null
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    quizzes: [QuizSchema]
});

export const User = mongoose.models.user || mongoose.model("user", UserSchema);
