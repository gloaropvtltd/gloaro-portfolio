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
import Blog from "@/components/Blog/Blog";
import SuccessStories from "@/components/SuccessStories/SuccessStories";
import FAQ from "@/components/FAQ/FAQ";
import Contact from "@/components/Contact/Contact";
import {
  getFaqs,
  getProcessSteps,
  getProducts,
  getProjects,
  getServices,
  getTechnologyGroups,
  getTestimonials,
  getWhyChooseUs,
} from "@/utils/content";

export default async function Home() {
  const [
    services,
    projects,
    products,
    technologyGroups,
    processSteps,
    whyChooseUs,
    testimonials,
    faqs,
  ] = await Promise.all([
    getServices(),
    getProjects(),
    getProducts(),
    getTechnologyGroups(),
    getProcessSteps(),
    getWhyChooseUs(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Services services={services} />
      <Industries />
      <Projects projects={projects} />
      <Products products={products} />
      <Technologies technologyGroups={technologyGroups} />
      <Process processSteps={processSteps} />
      <WhyChooseUs whyChooseUs={whyChooseUs} />
      <Testimonials testimonials={testimonials} />
      <Blog />
      <SuccessStories />
      <FAQ faqs={faqs} />
      <Contact />
    </>
  );
}
