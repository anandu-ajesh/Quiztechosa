import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "@/models/user"; // Adjust the import path according to your project structure

export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const { username, quizname } = await request.json();
    
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: 'User not found', status: 404 });
    }

    const quiz = user.quizzes.find(quiz => quiz.title === quizname);
    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found', status: 404 });
    }

    const maxScore = Math.max(...quiz.teams.map(team => team.score));
    const winners = quiz.teams.filter(team => team.score === maxScore).map(team => team.name);

    quiz.winner = winners;

    await user.save();

    return NextResponse.json({ message: 'ok', quiz });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', status: 500, error });
  }
}
