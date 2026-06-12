import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Collection from "@/components/Collection";
import NotesPyramid from "@/components/NotesPyramid";
import Atelier from "@/components/Atelier";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <SmoothScroll>
        <main>
          <Hero />
          <Manifesto />
          <Collection />
          <NotesPyramid />
          <Atelier />
          <FinalCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
