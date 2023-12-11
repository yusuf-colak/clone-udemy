// pages/api/auth/register.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import io from 'socket.io-client';

export default async function REGISTER(request: Request) {
  const body = await request.json();
  let failed = false;

  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

  const response = await axios
    .post(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
      domain: body.domain,
      name: body.name,
      email: body.email,
      password: body.password,
    })
    .catch((error) => {
      failed = true;
    });

  if (failed) {
    return NextResponse.json({ success: false });
  }

  const successResponse = NextResponse.json(
    { success: true },
    { status: 200, headers: { 'content-type': 'application/json' } }
  );

  socket.emit('message', response?.data.userId);

  successResponse.cookies.set({
    name: 'token',
    value: response?.data.accessToken,
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  return successResponse;
}
