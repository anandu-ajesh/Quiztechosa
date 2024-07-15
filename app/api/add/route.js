import { User } from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { teamName, teamMembers, username, quizname } = await request.json();
    const user = await User.findOne({ username: username });

    if (user) {
      const quizIndex = user.quizzes.findIndex((quiz) => quiz.title === quizname);
      if (quizIndex !== -1) {
        const existingTeam = user.quizzes[quizIndex].teams.find(team => team.name === teamName);
        if (existingTeam) {
          return NextResponse.json({ message: 'Team already exists' });
        } else {
          user.quizzes[quizIndex].teams.push({ name: teamName, members: teamMembers, score: 0 });
          await user.save();
          const quiz = user.quizzes[quizIndex];
          return NextResponse.json({ message: 'ok', quiz });
        }
      } else {
        return NextResponse.json({ message: 'Quiz not found' });
      }
    } else {
      return NextResponse.json({ message: 'User not found' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error });
  }
}

export async function GET(req) {
    try {
      await mongoose.connect(process.env.MONGO_URI)
      const url = new URL(req.url);
      const quizname = url.searchParams.get('name');
      const username = url.searchParams.get('user');
      const user = await User.findOne({ username: username });
  
      if (user) {
        const quiz = user.quizzes.find((quiz) => quiz.title === quizname);
        if (quiz) {
          return NextResponse.json({message: 'ok',quiz: quiz });
        } else {
          return NextResponse.json({ message: 'Quiz not found' });
        }
      } else {
        return NextResponse.json({ message: 'User not found' });
      }
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error', error });
    }
  }