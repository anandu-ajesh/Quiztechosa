import { User } from "@/models/user"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        
        const { username, quizname, teamname, action } = await request.json()
        
        // Find the user by username
        const user = await User.findOne({ username })
        if (!user) {
            return NextResponse.json({ message: 'User not found' })
        }

        // Find the quiz by quizname
        const quiz = user.quizzes.find(quiz => quiz.title === quizname)
        if (!quiz) {
            return NextResponse.json({ message: 'Quiz not found' })
        }

        // Find the team by teamname
        const team = quiz.teams.find(team => team.name === teamname)
        if (!team) {
            return NextResponse.json({ message: 'Team not found' })
        }

        // Update the team's score
         if(action === 'increase'){
            team.score += 1
         }
         if(action === 'decrease' && team.score > 0){
            team.score -= 1
         }

        // Save the updated user
        await user.save()

        return NextResponse.json({ message: 'ok', quiz })
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error })
    }
}
