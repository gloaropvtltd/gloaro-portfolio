"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { contactInfo, contactServiceOptions } from "@/data/contactInfo";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";
import { cn } from "@/utils/cn";

const emptyForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-surface-50 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Contact Us"
          title="Let's Build Something Great"
          description="Tell us about your project and we'll get back to you within one business day."
        />

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.4fr]"
        >
          <motion.div variants={fadeInUp}>
            <Card variant="dark" className="flex h-full flex-col gap-6">
              <div>
                <h3 className="font-heading text-h3 text-white">Get in Touch</h3>
                <p className="mt-2 text-sm text-navy-100/75">
                  Prefer to reach out directly? Here's how to find us.
                </p>
              </div>
              <ul className="flex flex-col gap-4 text-sm text-navy-100/85">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                  <span>{contactInfo.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-gold-400" />
                  <a href={contactInfo.phoneHref} className="hover:text-white">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0 text-gold-400" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="website"
                  value={values.website}
                  onChange={handleChange("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                    className={cn("input-base", errors.name && "border-danger")}
                  />
                  {errors.name && <p className="text-xs text-danger">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    className={cn("input-base", errors.email && "border-danger")}
                  />
                  {errors.email && <p className="text-xs text-danger">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={values.company}
                    onChange={handleChange("company")}
                    className="input-base"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    className="input-base"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="service" className="text-sm font-medium text-foreground">
                    Service
                  </label>
                  <select
                    id="service"
                    value={values.service}
                    onChange={handleChange("service")}
                    className="input-base"
                  >
                    <option value="">Select a service</option>
                    {contactServiceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange("message")}
                    className={cn("input-base resize-none", errors.message && "border-danger")}
                  />
                  {errors.message && <p className="text-xs text-danger">{errors.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </Button>

                  {status === "success" && (
                    <p className="mt-3 text-sm font-medium text-success">
                      Thanks — your message has been sent. We'll be in touch soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-3 text-sm font-medium text-danger">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
