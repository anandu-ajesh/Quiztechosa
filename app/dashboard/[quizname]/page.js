'use client'

import Navbar from '@/components/navbar'
import TeamForm from '@/components/teamform'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function QuizName() {

    const [teamName, setTeamName] = useState('')
    const [teamMembers, setTeamMembers] = useState('')
    let {quizname} = useParams()
    quizname = decodeURIComponent(quizname)
    const {data: session} = useSession()
    const [Teams, setTeams] = useState([])
    const [id, setId] = useState('')
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
      async function getData(){
        if(session){
          try {
            const response = await fetch(`/api/add?name=${quizname}&user=${session.username}`, {
              cache: 'no-store',
              method: 'GET',
            })
              const data = await response.json()
              const ok = data?.message === 'ok'
              if(ok){
                const {quiz} = data;
                const {_id} = quiz;
                const {teams} = quiz;
                setId(_id)
                setTeams(teams)
              }
          } catch (error) {
            console.log(error)
          }
        }
      }
      getData()
    },[session])
    

    const Add = async (e)=> {
      e.preventDefault();
      setLoading(true)
      try {
        if(!teamName || !teamMembers){
          setLoading(false)
          setError('Enter team name and members')
          return
        }
        const response = await fetch('/api/add', {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'Content-Type': 'applications/json',
          },
          body: JSON.stringify({teamName, teamMembers, quizname, username: session.username})
        })
          const data = await response.json()
          const ok = data?.message === 'ok'
          if(ok){
            setLoading(false)
            const {quiz} = data;
            const {teams} = quiz;
            setTeams(teams)
            setTeamName('')
            setTeamMembers('')
          }else{
            setLoading(false)
            setError('Team already exists')
          }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    const route = (e) => {
      e.preventDefault();
      router.push(`/dashboard/${quizname}/${id}`)
    }

  return (
    <>
    <Navbar
        themeMode={'light'}
      />
      <TeamForm error={error} teamName={teamName} loading={loading} teamMembers={teamMembers} setTeamName={setTeamName} setTeamMembers={setTeamMembers} Add={Add} teams={Teams} route={route} />
    </>
  )
}

export default QuizName