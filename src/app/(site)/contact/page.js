import Contact from "@/components/Contact/Contact";
import Container from "@/components/ui/Container";

const siteUrl = "https://www.gloaro.in";

const title = "Contact GLOARO Pvt Ltd | Kallakurichi, Tamil Nadu";
const description =
  "Get in touch with GLOARO Pvt Ltd — call, email, or send a project enquiry. Based in Kallakurichi, Tamil Nadu, India.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  };
}

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-navy-950 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <h1 className="font-heading text-h1 leading-[1.08] text-white">Contact GLOARO</h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">
            Based in Kallakurichi, Tamil Nadu — reach out by phone, email, or the form below and
            we&apos;ll get back to you within one business day.
          </p>
        </Container>
      </section>

      <Contact />
    </>
  );
}
