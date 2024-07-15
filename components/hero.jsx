'use client'

import { useState } from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const Hero = ({ themeMode, quizzes }) => {

  const [heroState, setHeroState] = useState(false);
  const [authState, setAuthState] = useState(false);
  const {data: session} = useSession()
  const router = useRouter()
  const {theme} = useTheme()

  const handleGetStarted = () => {
    setHeroState(true);
  };

  const auth = () => {
    setAuthState(!authState);
  };

  return (
    <main className="mx-auto mt-8 px-6 text-xl sm:px-16 xl:flex xl:w-full xl:items-start xl:px-0">
      {heroState? (
        authState? (
          <SignIn auth={auth}/>
        ) : (
          <SignUp auth={auth}/>
        )
      ) : (
        <section className="flex flex-col gap-4 xl:w-1/2">
          <h2 className="mb-2 flex flex-col text-[40px] leading-tight sm:text-[64px]">
            <span className="font-extralight">Plan in seconds,</span>
            <span className="font-medium"> not weekends.</span>
          </h2>
          {!session && 
          <button
            className={`lg:w-1/3 shadow-2xl px-2 py-4 bg-violet-800 dark:bg-[#00c8c3] text-white rounded-md  sm:text-xl`}
            onClick={handleGetStarted}
          >
            GetStarted.
          </button>}
          {session &&
            <button
            className={`lg:w-1/3 shadow-2xl px-2 py-4 ${theme === 'light' ? 'bg-violet-800' : 'bg-[#00c8c3]' } text-white rounded-md  sm:text-xl`}
            onClick={()=>router.push('/dashboard')}
          >
            Dashboard
          </button>
          }
        </section>
      )}

      <section className="mt-10 flex flex-col gap-3 sm:gap-6 xl:mt-0 xl:w-1/2 xl:items-end">
        {quizzes.map((quiz) => {
          return (
            <div
              key={quiz.title}
              className="flex h-16 cursor-pointer items-center gap-4 rounded-xl bg-white p-3 drop-shadow-sm transition-all duration-200 ease-in-out hover:opacity-75 dark:bg-navy sm:h-20 sm:gap-8 sm:rounded-3xl xl:h-24 xl:w-[564px] xl:p-5"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md sm:h-14 sm:w-14 sm:rounded-xl"
                style={{ backgroundColor: quiz.iconbg }}
              >
                <img
                  src={quiz.icon}
                  alt={quiz.title}
                  className="h-7 w-7 sm:h-10 sm:w-10"
                />
              </div>

              <p className="text-lg font-medium sm:text-[28px]">{quiz.title}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Hero;