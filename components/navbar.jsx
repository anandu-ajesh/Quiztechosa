'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogoutOutlined } from '@ant-design/icons';


const Navbar = () => {
  
  const router = useRouter()
  const {theme , setTheme} = useTheme()
  const {data: session} = useSession()
  const handleThemeMode = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };


  return (
    <nav className="flex h-[72px] items-center justify-between px-6 sm:p-16 xl:w-full xl:px-0 xl:py-20 z-50">
      
        <section className="flex items-center justify-start gap-4 sm:gap-6">
          <div
            className="flex h-10 cursor-pointer w-10 items-center justify-center rounded-md sm:h-14 sm:w-14"
           onClick={()=>router.push('/')}
          >
            <Image width={10} height={10} src='/icon-html.svg' alt='logo' className="h-7 w-7 sm:h-10 sm:w-10" />
          </div>
          <h1 onClick={()=>router.push('/')} className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium cursor-pointer sm:text-[28px]`}>Techosa</h1>
        </section>
      <section className="flex items-center gap-2 sm:gap-3">
        {theme === 'dark' ? (
          <img
            src="/icon-sun-light.svg"
            alt="Light Mode"
            className="h-4 w-4 sm:h-6 sm:w-6"
          />
        ) : (
          <img
            src="/icon-sun-dark.svg"
            alt="Light Mode"
            className="h-4 w-4 sm:h-6 sm:w-6"
          />
        )}

        <div
          className="h-5 w-8 cursor-pointer rounded-full bg-purple p-1 sm:h-7 sm:w-12"
          onClick={handleThemeMode}
        >
          <div
            className={
              theme === 'dark'
                ? 'ml-auto h-3 w-3 rounded-full bg-white transition-all duration-300 ease-in-out sm:h-5 sm:w-5'
                : 'mr-auto h-3 w-3 rounded-full bg-white transition-all duration-300 ease-in-out sm:h-5 sm:w-5'
            }
          ></div>
        </div>
        {theme === 'dark' ? (
          <img
            src="/icon-moon-light.svg"
            alt="Dark Mode"
            className="h-4 w-4 sm:h-6 sm:w-6"
          />
        ) : (
          <img
            src="/icon-moon-dark.svg"
            alt="Dark Mode"
            className="h-4 w-4 sm:h-6 sm:w-6"
          />
        )}
        {session && <LogoutOutlined onClick={async()=>{await signOut({callbackUrl: '/'})}} className='ps-4 text-xl dark:text-white cursor-pointer text-teal-700'/>}
      </section>
    </nav>
  );
};

export default Navbar;