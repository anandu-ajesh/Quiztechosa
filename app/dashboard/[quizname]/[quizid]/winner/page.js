

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import WinnerGrid from '@/components/winner'
import { User } from '@/models/user';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import React from 'react'

async function Winner({params}) {
    let {quizname, quizid} = params;
    quizname = decodeURIComponent(quizname)
    const session = await getServerSession(authOptions) || null
    if (!session) {
        return (
            <div>Session not found. Please log in.</div>
        );
    }
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({username: session.username})
    if(!user){
        return (
            <></>
        )
    }
    const quiz = user.quizzes.id(quizid);
    if (!quiz) {
        return (
            <div>Quiz not found</div>
        );
    }
    let maxScore = -1;
    let winners = [];
    quiz.teams.forEach(team => {
        if (team.score > maxScore) {
            maxScore = team.score;
            winners = [team.name];
        } else if (team.score === maxScore) {
            winners.push(team.name);
        }
    });

    quiz.winner = winners;
    await user.save();
    

  return (
    <>
        <WinnerGrid winners={winners}/>
    </>
  )
}

export default Winner