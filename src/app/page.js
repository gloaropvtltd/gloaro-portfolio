import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Industries from "@/components/Industries/Industries";
import Projects from "@/components/Projects/Projects";
import Products from "@/components/Products/Products";
import Technologies from "@/components/Technologies/Technologies";
import Process from "@/components/Process/Process";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import Testimonials from "@/components/Testimonials/Testimonials";
import FAQ from "@/components/FAQ/FAQ";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Industries />
      <Projects />
      <Products />
      <Technologies />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
