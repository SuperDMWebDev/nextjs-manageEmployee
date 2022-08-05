import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/employees');
  });
  return (
    <>
      <Header />
    </>
  );
}
