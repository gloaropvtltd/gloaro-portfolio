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
  getBlogPosts,
  getFaqs,
  getProcessSteps,
  getProducts,
  getProjects,
  getServices,
  getTechnologyGroups,
  getTestimonials,
  getWhyChooseUs,
} from "@/utils/content";

function buildFaqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

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
    blogPosts,
  ] = await Promise.all([
    getServices(),
    getProjects(),
    getProducts(),
    getTechnologyGroups(),
    getProcessSteps(),
    getWhyChooseUs(),
    getTestimonials(),
    getFaqs(),
    getBlogPosts(),
  ]);

  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
      <Blog posts={blogPosts.slice(0, 3)} />
      <SuccessStories />
      <FAQ faqs={faqs} />
      <Contact />
    </>
  );
}
