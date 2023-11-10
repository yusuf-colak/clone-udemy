'use client';

import { useAuth } from '../../../hooks/useAuth';

export default function PanelPage() {
  const auth: any = useAuth();
  console.log('auth', auth);
  return (
    <>
      <div></div>
    </>
  );
}
