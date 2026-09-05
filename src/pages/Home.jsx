import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import TechStack from "../components/TechStack";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <TechStack />
      <CTA />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;