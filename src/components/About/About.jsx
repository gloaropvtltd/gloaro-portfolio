"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import StatCounter from "@/components/ui/StatCounter";
import { stats } from "@/data/stats";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

const coreValues = [
  "Innovation",
  "Integrity",
  "Excellence",
  "Transparency",
  "Collaboration",
  "Customer Success",
  "Continuous Learning",
  "Sustainable Growth",
];

export default function About() {
  return (
    <section id="about" className="bg-surface-50 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="About GLOARO"
          title="Transforming Businesses Through Innovation, Technology & Digital Connectivity"
          description="GLOARO PVT LTD is a future-focused technology and business solutions company building a powerful digital ecosystem for entrepreneurs, startups, SMEs, retailers, professionals, and enterprises — helping businesses grow faster through technology, strategic networking, digital transformation, and innovative business services."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <h3 className="font-heading text-h3 text-foreground">Who We Are</h3>
          <p className="mt-3 text-body-lg text-muted">
            We develop technology-driven platforms and business solutions
            that improve productivity, increase market reach, strengthen
            customer engagement, and support sustainable business growth —
            delivering reliable, scalable, and innovative digital services
            that help organizations succeed in an increasingly connected
            world.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-2"
        >
          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                <Target className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-h3 text-foreground">Our Mission</h3>
              <p className="mt-3 text-body-lg text-muted">
                To empower businesses with innovative digital solutions,
                trusted business networking, and technology that drives
                measurable growth.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                <Eye className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-h3 text-foreground">Our Vision</h3>
              <p className="mt-3 text-body-lg text-muted">
                To become a globally recognized business networking and
                digital technology company that enables millions of
                entrepreneurs and organizations to grow together.
              </p>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {coreValues.map((value) => (
            <motion.span
              key={value}
              variants={fadeInUp}
              className="badge-base border border-navy-100 bg-white text-navy-700"
            >
              {value}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-2 gap-6 rounded-3xl bg-navy-950 px-8 py-12 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="font-heading text-h2 text-white">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-navy-100/70">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mx-auto mt-12 max-w-2xl text-center text-body-lg text-muted"
        >
          <span className="font-heading font-semibold text-foreground">
            Our Commitment —{" "}
          </span>
          delivering high-quality digital solutions, exceptional customer
          experiences, ethical business practices, and continuous innovation
          that create measurable value for businesses and communities.
        </motion.p>
      </Container>
    </section>
  );
}
