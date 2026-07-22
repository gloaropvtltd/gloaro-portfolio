"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import StatCounter from "@/components/ui/StatCounter";
import { stats } from "@/data/stats";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

export default function About() {
  return (
    <section id="about" className="bg-surface-50 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="About GLOARO"
          title="Engineering Digital Growth, Together"
          description="GLOARO PVT LTD is a premium software development company committed to turning ambitious ideas into scalable digital products — partnering with businesses to design, build, and grow technology that lasts."
        />

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
                To engineer innovative, reliable digital solutions that help
                businesses connect with their audiences and scale with
                confidence — guided by our founding principle: Referral,
                Connect, Grow, Collaborate.
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
                To become a trusted global digital network — where
                technology, collaboration, and growth move together for
                every client we partner with.
              </p>
            </Card>
          </motion.div>
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
      </Container>
    </section>
  );
}
