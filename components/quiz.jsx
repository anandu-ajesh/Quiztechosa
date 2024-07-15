'use client'
import { useRouter } from 'next/navigation'
import React from 'react'


function Quiz({quizzes}) {

  const router = useRouter()
  const navigate = (name, id, status) => {
    if(status){
      router.push(`/dashboard/${name}/${id}/winner`)
    }else{
      router.push(`/dashboard/${name}/${id}`)
    }
  }
  return (
   <div className='grid lg:grid-cols-4  gap-3'>
    { quizzes.length > 0 && quizzes.map((quiz, index)=>(
         <div key={index} onClick={()=>navigate(quiz.title, quiz._id, quiz.winner)} className="max-w-sm cursor-pointer hover:bg-gray-100 pb-4 overflow-hidden shadow-lg bg-white rounded-md">  
         <div className="px-6 py-4">
             <div className="font-bold text-center dark:text-black text-xl mb-2">{quiz.title}</div>
         </div>
         <div className="px-6 pt-4 pb-2 flex flex-col text-center">
             <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">cordinator: {quiz.cordinator.name}</span>
             <span className="inline-block bg-green rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">status: {quiz.winner ? 'completed' : 'Ongoing'}</span>
         </div>
         </div>
    ))}
   </div>
  )
}

export default Quiz