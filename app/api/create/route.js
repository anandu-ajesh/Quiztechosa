import { User } from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const { title, cordinator, username } = await request.json();

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        // Check if a quiz with the same title already exists
        const existingQuiz = user.quizzes.find(quiz => quiz.title === title);
        if (existingQuiz) {
            return NextResponse.json({ message: 'Quiz with this title already exists' });
        }

        // Add new quiz
        const newQuiz = {
            title: title,
            cordinator: { name: cordinator },
            teams: [],
            winner: null,
        };

        user.quizzes.push(newQuiz);
        await user.save();

        return NextResponse.json({ message: 'ok' });
    } catch (error) {
        return NextResponse.json({ message: 'internal server error', error });
    }
}
