'use client';
import About from '@/components/root/About';
import Banner from '@/components/root/Banner';
import Projects from '@/components/root/Projects';
import Skills from '@/components/root/Skills';
import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <main>
      <Banner />
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
