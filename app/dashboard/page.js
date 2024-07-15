'use client'

import Navbar from "@/components/navbar";
import Quiz from "@/components/quiz";
import { LoadingOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";





function Dashboard() {

    const {data: session} = useSession()
    const [showPopOver, setShowPopover] = useState(false)
    const [title, setTitle] = useState('')
    const [cordinator, setCordinator] = useState('')
    const router= useRouter()
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

   useEffect(()=>{
    if(session){
      async function fetchquiz(){
        try {
          const response = await fetch(`/api/quizzes?username=${session.username}`, {
            cache: 'no-store',
            method: 'GET',
          })
          const data = await response.json()
          if (data?.message === 'ok') {
            setQuizzes(data.quizzes || [])
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchquiz()
    }
   },[session])

   setTimeout(() => {
    setLoading(false);
  }, "3000");
    
  const createquiz = async (e) => {
    setLoading(true)
    try{
      e.preventDefault();
      if (!title || !cordinator) {
        setError('please fill the fields')
         setLoading(false)
         return;
       }
    const response = await fetch('/api/create', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'applications/json',
      },
      body: JSON.stringify({title, cordinator, username: session.username})
    })
      const data = await response.json()
      const ok = data?.message === 'ok'
      if(ok){
        router.push(`/dashboard/${title}`)
        setLoading(false)
      }else{
        setLoading(false)
        setError('Quiz with this title already exists')
      }
  }catch(error){
    setLoading(false)
    console.log(error)
  }
  }

  return (
    <>
    <Navbar
        themeMode={'light'}
      />
      {!showPopOver &&
        (<>
        
        
        <button
          className="mx-auto mb-14 flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-3xl font-medium text-white"
          onClick={()=>setShowPopover(true)}
        >
          Create Quiz
        </button> 
        {quizzes.length > 0 && !loading && <Quiz quizzes={quizzes}/>}
        {loading && <div className="w-full flex items-center justify-center mb-20"><LoadingOutlined className="text-4xl"/></div>}
        {quizzes.length == 0 && !loading && <h1 className=" mx-auto mb-10 text-4xl text-center text-gray-800 max-w-lg p-6 border-2 border-gray-600 rounded-lg bg-white shadow-lg italic">
          I'm hosting a quiz show, but I never considered myself a game show host.
      </h1>}
        </>
      
      )}  
        {showPopOver  &&
        (<form
          className="mx-auto max-w-md rounded bg-white p-4 shadow-md"
        >
          <h2 className="mb-4 text-3xl font-bold text-emerald-600">
            Create Quiz
          </h2>
          <label className="mb-4 block">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
             name='title'
              className="block w-full border border-gray-300 p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter quiz title"
            />
          </label>
          <label className="mb-4 block">
            <span className="text-gray-700">Coordinator</span>
            <input
              type="text"
              value={cordinator}
              onChange={(e)=>setCordinator(e.target.value)}
              name='cordinator'
              className="mb-5 block w-full border border-gray-300 p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter coordinator name"
              autoComplete="off"
            />
          </label>
          <button
            onClick={createquiz}
            disabled={loading}
            className="mb-4 w-full rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700"
          >
            {loading ? <LoadingOutlined/> : 'Next'}
          </button>
          <p className='text-sm text-center text-red'>{error && error}</p>
        </form>)}  
       
    </>
  )
}

export default Dashboard