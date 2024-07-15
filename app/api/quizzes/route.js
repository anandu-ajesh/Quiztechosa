

import { User } from "@/models/user"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    // Find the user by username
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json({ message: 'User not found' })
    }

    // Get quizzes conducted by the user
    const quizzes = user.quizzes

    return NextResponse.json({ message: 'ok', quizzes })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error })
  }
}
