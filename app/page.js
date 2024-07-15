

import Navbar from "@/components/navbar";
import data from '../utils/data.json'
import Hero from "@/components/hero";


export default function Home() {
  const quizzes = data.quizzes;
  return (
    <>
      <Navbar
      />
     <Hero quizzes={quizzes} />
    </>
  );
}
