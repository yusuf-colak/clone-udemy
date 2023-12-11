'use client';
import React from 'react';
import { Logout } from 'iconsax-react';
import { ArrowRight } from 'iconsax-react';
import { Button } from '@/libs/ui/components/ui/button';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get current host as domain
    const domain = window.location.host;
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain,
          name,
          email,
          password,
        }),
      });

      const { success } = await res.json();

      if (success) {
        const nextUrl = new URLSearchParams(window.location.search).get('next');
        router.push(nextUrl ?? '/');
        router.reload();
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <div className={'bg-gray-50 h-screen w-full'}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm p-6 bg-white rounded-xl shadow-md">
            <div className="text-center">
              <Logout
                className="mx-auto h-10 w-auto"
                size={24}
                color="#4f46e5"
              />
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Kayıt ol!
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="İsim"
                  ref={nameRef}
                  className="block w-full border-b-2 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email Adresi"
                  ref={emailRef}
                  className="block w-full border-b-2 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Şifre"
                  ref={passwordRef}
                  className="block w-full border-b-2 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />

                <div className="flex items-center justify-between mt-2">
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="remember" className="text-gray-500">
                        Beni hatırla
                      </label>
                    </div>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Parolanızı mı unuttunuz?
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button variant={'default'}>
                  Kaydol <ArrowRight className="w-auto" size={24} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
