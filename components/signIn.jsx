'use client'

import { LoadingOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



const SignIn = ({auth}) => {

  const [visibility, setVisibility] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!username || !password) {
      setError('please fill the fields')
      setLoading(false)
      return;
    }
    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    if (res.error) {
      setLoading(false)
      setError('incorrect username or password')
      console.log(res.error);
      return;
    } else {
      setLoading(false)
      router.push("/dashboard");
    }
  };
  
  return (
    <div className="mx-auto max-w-screen-2xl px-8  sm:px-12 lg:px-16">
      <div className="mx-auto max-w-2xl">
          <form action="#" className="mb-0 mt-12 space-y-6 rounded-lg p-8 shadow-lg sm:p-12 lg:p-16">
            <p className="text-center text-xl font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>

              <div className="relative">
                <input
                  type="username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-2 pe-16 text-lg shadow-sm outline-none"
                  placeholder="Enter username"
                  autoComplete='off'
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>

              <div className="relative">
                <input
                   type={visibility ? "text" : "password"}
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-2 pe-16 text-lg shadow-sm outline-none"
                  placeholder="Enter password"
                  autoComplete='off'
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-6 cursor-pointer" onClick={()=>setVisibility(!visibility)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="block w-full rounded-lg bg-indigo-600 px-8 py-4 text-lg font-medium text-white"
            >
              {loading ? <LoadingOutlined/> : 'Sign in'}
            </button>
            <p className='text-sm text-center text-red'>{error && error}</p>
            <p className="text-center text-lg text-gray-500">
              <p className=" cursor-pointer" onClick={auth}>Don't have an account? Sign up</p>
            </p>
          </form>
      </div>
    </div>
  );
};

export default SignIn;