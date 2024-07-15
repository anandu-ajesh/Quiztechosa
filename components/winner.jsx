'use client'

import Navbar from './navbar'
import '../utils/style.css'
import React from 'react'
import ConfettiCanvas from './confetti'


function WinnerGrid({winners}) {

    

  return (
    <>
        <Navbar/>
        <div className="mx-auto flex items-center rounded-full bg-white">
          <div
            className="h-[500px] w-[600px]  bg-cover bg-center rounded-lg "
            style={{
              backgroundImage: `url('/winners.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className=" flex h-[500px] w-[600px]  items-center justify-center p-4 pb-8 pt-6 font-serif shadow-md rounded-tr-full rounded-br-full" >
            <ConfettiCanvas/>
            <div className="flex flex-col items-center justify-center">
              {winners.length > 0 && winners.length == 1 &&
              <div className="mb-2 flex flex-col items-center text-4xl font-bold text-orange-500">
              Congratulations 
              <p className='text-6xl'>{winners[0]}</p>
              </div>}
              {winners.length > 0 && winners.length > 1 &&
              <div className="mb-2 text-4xl flex flex-col gap-1 items-center font-bold text-orange-500">
                Congratulations Teams 
                {winners.map((winner, index)=>(
                  <p key={index} className='text-5xl'>{winner}</p>
                ))}
              </div>}
              
            </div>
          </div>
        </div>
    </>
  )
}

export default WinnerGrid