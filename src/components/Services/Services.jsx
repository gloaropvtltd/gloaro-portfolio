"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { services } from "@/data/services";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="What We Do"
          title="Services Built For Scale"
          description="From first prototype to enterprise platform, GLOARO delivers the full stack of digital capability under one roof."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeInUp}>
              <Card className="group h-full">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(image:--gradient-brand) text-white transition-transform duration-base ease-brand group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-h3 text-foreground">{title}</h3>
                <p className="mt-3 text-body-lg text-muted">{description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
