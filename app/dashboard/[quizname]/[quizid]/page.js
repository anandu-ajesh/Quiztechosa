'use client'

import Navbar from '@/components/navbar'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LoadingOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'


function Quiz() {
  const [teams, setTeams] = useState([])
  const { data: session } = useSession()
  let { quizname, quizid } = useParams()
  quizname = decodeURIComponent(quizname)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getTeams = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/add?name=${quizname}&user=${session.username}`, {
            cache: 'no-store',
            method: 'GET',
          })
          const data = await response.json()
          if (data?.message === 'ok') {
            const { quiz } = data;
            const { teams } = quiz;
            setTeams(teams || [])
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    getTeams()
  }, [session, quizname])

  const scoreChange = async (teamname, action)=> {
    try {
      const response = await fetch('/api/score', {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'applications/json',
        },
        body: JSON.stringify({username: session?.username, quizname, teamname, action})
      })
        const data = await response.json()
        const ok = data?.message === 'ok'
        if(ok){
          const { quiz } = data;
            const { teams } = quiz;
            setTeams(teams || [])
            if(action === 'increase'){
              toast(`One Point for ${teamname}`, { icon: '😊', duration: '500'})
            }else if(action === 'decrease'){
              toast(`One Minus Point for ${teamname}`, { icon: '😢', duration: '500'})
            }
        }
    } catch (error) {
      console.log(error)
    }
  
  }

  const finishQuiz = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/winner', {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: session?.username, quizname }),
      });
      const data = await response.json();
      if (data?.message === 'ok') {
        router.push(`/dashboard/${quizname}/${quizid}/winner`)
        
      }else{
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container relative mx-auto p-4 bg-gray-300 shadow-md rounded text-black h-[70vh] z-40">
        <h2 className="text-3xl font-bold mb-4 text-black justify-center items-center flex">SCOREBOARD</h2>
        
          {teams.length > 0 ?
          <>
            <div>
            <div className="grid lg:grid-cols-3 gap-4">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="rounded relative bg-white p-4 text-black shadow-md flex flex-col justify-center items-center"
                >
                  <h3>{team.name}</h3>
                  <p>Members: {team.members}</p>
                  <p className="">score: {team.score}</p>
                  <div className="absolute bottom-2 right-2 flex gap-4">
                    <Image onClick={()=>scoreChange(team.name, 'increase')} src='/add.png' alt='add point' width={25} height={25} className="cursor-pointer"/>
                    <Image onClick={()=>scoreChange(team.name, 'decrease')} src='/remove.png' alt='add point' width={25} height={25} className="cursor-pointer"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
         : (
            <p></p>
          )}
        <button disabled={loading} onClick={finishQuiz} className='bg-blue-500 absolute bottom-4 right-1/2 px-4 text-white py-2 rounded-md'>{loading ? <LoadingOutlined/> : 'Finish quiz'}</button>
      </div>
    </>
  )
}

export default Quiz
