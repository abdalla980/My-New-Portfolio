import { useEffect } from 'react';
import { Hero } from '../components/Hero/Hero';
import { About } from '../components/About/About';
import { FeaturedProjects } from '../components/FeaturedProjects/FeaturedProjects';
import { Contact } from '../components/Contact/Contact';
import { setPageMeta } from '../lib/seo';

export default function HomePage() {
  useEffect(() => {
    setPageMeta({
      title: 'Web Developer & Designer',
      description:
        'Personal portfolio showcasing web development projects, design work, and software engineering expertise.',
      path: '/',
    });
  }, []);

  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Contact />
    </>
  );
}
