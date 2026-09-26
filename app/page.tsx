import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Builder from "@/components/sections/Builder";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Builder />
        <Experience />
        <Skills />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
