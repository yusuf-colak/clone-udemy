'use client'

import React, {useEffect, useRef, useState} from 'react';
import {ArrowRight, Logout} from 'iconsax-react';
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/libs/ui/components/ui/button";
import io from 'socket.io-client';

export default function Login() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    //get current host as domain
    const domain = window.location.host;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        domain,
        email,
        password,
      }),
    });
    const { success } = await res.json();

    if (success) {
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ?? "/");
      router.refresh();
    } else {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if(process.env.NODE_ENV === 'development') {
      emailRef.current!.value = 'superadmin@microprefix';
      passwordRef.current!.value = 'superadmin';
    }
    // Create a socket connection
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log(message);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>

      <div className={'bg-gray-50 h-screen w-full'}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm p-6 bg-white rounded-xl shadow-md">
            <div className="text-center">

              <Logout  className="mx-auto h-10 w-auto" size={24} color="#4f46e5" />

              <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome!
              </h2>
              <p className={'text-gray-500'}>Sign to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
              <div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  placeholder="Email Address"
                  ref={emailRef}
                  className="block w-full border-b-2 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  placeholder="Password"
                  ref={passwordRef}
                  className="block w-full border-b-2 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />

                <div className="flex items-center justify-between mt-2">
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        aria-describedby="candidates-description"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">

                      <p id="candidates-description" className="text-gray-500">
                        Remember Me
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button>
                  Sign in
                  <ArrowRight className="w-auto" size={24} />
                </Button>

              </div>
            </form>
          </div>
        </div>
      </div>

    </>
    )
}

