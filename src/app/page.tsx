import About from '@/components/root/About';
import Banner from '@/components/root/Banner';
import Projects from '@/components/root/Projects';
import Skills from '@/components/root/Skills';

export default function Home() {
  return (
    <main>
      <Banner/>
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
