import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken } from '../../libs/auth';
import { NextApiRequest } from 'next';

const fromServer = async (req: NextApiRequest) => {
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get('token') ?? null;
  return await verifyJwtToken(token);
};

export function useAuth() {
  const [auth, setAuth] = useState(null);

  const getVerifiedToken = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token') ?? null;
    const verifiedToken: any = await verifyJwtToken(token);
    setAuth({ token, ...verifiedToken });
  };

  useEffect(() => {
    getVerifiedToken();
  }, []);

  return auth;
}

export function logout() {
  const cookies = new Cookies();
  cookies.remove('token');
  window.location.reload();
}

useAuth.fromServer = fromServer;
