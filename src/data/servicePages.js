// Content for dedicated /services/[slug] pages. Every claim here traces back
// to services.js, technologies.js, products.js, or process.js — nothing new
// is asserted that isn't already true elsewhere in the codebase.

export const servicePages = {
  "software-development": {
    title: "Custom Software Development Services",
    seoTitle: "Custom Software Development Company | GLOARO Pvt Ltd",
    metaDescription:
      "GLOARO builds custom software for startups, SMEs, and enterprises — from requirement analysis to deployment and ongoing support.",
    primaryKeyword: "custom software development company",
    intro:
      "GLOARO designs and builds custom software engineered around your exact workflows — not off-the-shelf templates. From first prototype to production, every build follows the same structured process our team uses for every project.",
    sections: [
      {
        heading: "What We Build",
        body: "Custom business software, internal tools, and platform-scale applications built around your specific operations — from first prototype to a production system your team can rely on.",
      },
      {
        heading: "Our Development Process",
        body: "Every engagement follows the same seven-stage process: requirement analysis, planning, UI/UX design, development, testing, deployment, and ongoing maintenance — so you always know what phase your project is in and what's next.",
      },
      {
        heading: "Technologies We Use",
        body: "Our engineering team builds primarily on React, Next.js, and Tailwind CSS on the frontend, Node.js, NestJS, or Laravel on the backend, with PostgreSQL, MySQL, or Supabase for data — plus AI and automation tooling where it genuinely improves the product.",
      },
    ],
    techStack: ["React", "Next.js", "Node.js", "NestJS", "Laravel", "PostgreSQL"],
    relatedCaseStudy: { title: "AI-Powered CRM Customization", href: "/products/1" },
    faqs: [
      {
        id: "sd-1",
        question: "How long does custom software development take?",
        answer:
          "Timelines vary by scope — a typical MVP takes 4 to 8 weeks, while larger platforms can take 3 months or more. You'll get a clear, project-specific timeline right after requirement analysis.",
      },
      {
        id: "sd-2",
        question: "Do you provide support after launch?",
        answer:
          "Yes. Every project includes a post-launch support window, and we offer ongoing maintenance plans for continued updates and monitoring after that.",
      },
    ],
    cta: { label: "Start Your Project", href: "/contact" },
  },

  "web-development": {
    title: "Web Development Solutions for Growing Businesses",
    seoTitle: "Web Development Company | GLOARO Pvt Ltd",
    metaDescription:
      "Fast, scalable, SEO-ready websites and web applications built by GLOARO — from corporate sites to full e-commerce platforms.",
    primaryKeyword: "web development company",
    intro:
      "GLOARO designs and builds fast, scalable websites and web applications — engineered for performance, SEO, and growth from day one.",
    sections: [
      {
        heading: "What's Included",
        body: "Corporate websites, content-managed sites, and full web applications — built responsive, accessible, and fast by default.",
      },
      {
        heading: "Case Studies",
        body: "We've shipped a corporate website with an integrated CMS for easy content updates, and a full e-commerce platform with product catalog, cart, and secure checkout built for scale.",
      },
      {
        heading: "Our Process",
        body: "The same seven-stage process behind every GLOARO build: requirement analysis, planning, UI/UX design, development, testing, deployment, and maintenance.",
      },
    ],
    techStack: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    relatedCaseStudy: { title: "See Our Featured Projects", href: "/#projects" },
    faqs: [
      {
        id: "wd-1",
        question: "Will my website be optimized for search engines?",
        answer:
          "Yes — every site we build is engineered for performance and SEO from the start, not bolted on afterward.",
      },
      {
        id: "wd-2",
        question: "Can you add a content management system?",
        answer:
          "Yes. We've built corporate websites with an integrated CMS so your team can update content without touching code.",
      },
    ],
    cta: { label: "Request a Website Quote", href: "/contact" },
  },

  "mobile-app-development": {
    title: "Mobile App Development Services",
    seoTitle: "Mobile App Development Company | GLOARO Pvt Ltd",
    metaDescription:
      "GLOARO builds cross-platform mobile apps with Flutter and React Native — from concept to app-store launch.",
    primaryKeyword: "mobile app development company",
    intro:
      "GLOARO builds cross-platform mobile apps with Flutter and React Native — a single, well-engineered codebase that feels native on both iOS and Android.",
    sections: [
      {
        heading: "What We Build",
        body: "Cross-platform mobile applications that extend your business onto mobile — built from a single codebase to keep development efficient without compromising on feel.",
      },
      {
        heading: "Cross-Platform Technology",
        body: "We build with Flutter and React Native, backed by the same Node.js, NestJS, or Laravel APIs and PostgreSQL/MySQL data layer we use across our software projects.",
      },
      {
        heading: "Our Process",
        body: "Every mobile build follows the same seven-stage process as our software projects: requirement analysis, planning, UI/UX design, development, testing, deployment, and maintenance.",
      },
    ],
    techStack: ["Flutter", "React Native", "Node.js", "PostgreSQL"],
    relatedCaseStudy: { title: "See Our Software Projects", href: "/#projects" },
    faqs: [
      {
        id: "ma-1",
        question: "Do you build for both iOS and Android?",
        answer:
          "Yes — we build cross-platform with Flutter and React Native, so a single codebase covers both iOS and Android.",
      },
      {
        id: "ma-2",
        question: "How much does a mobile app cost?",
        answer:
          "Cost depends on scope, complexity, and timeline. Share your requirements through our contact form and we'll provide a transparent quote.",
      },
    ],
    cta: { label: "Discuss Your App Idea", href: "/contact" },
  },

  "crm-automation": {
    title: "CRM & Business Automation Solutions",
    seoTitle: "CRM & Business Automation Company | GLOARO Pvt Ltd",
    metaDescription:
      "Custom CRM and business automation tools from GLOARO — see our AI-powered CRM case study and streamline your operations.",
    primaryKeyword: "CRM software development company",
    intro:
      "GLOARO builds CRM and automation tools that streamline operations, strengthen customer relationships, and support sustainable growth.",
    sections: [
      {
        heading: "What We Build",
        body: "CRM systems tailored to your exact sales pipeline, plus automation that removes repetitive manual work from day-to-day operations.",
      },
      {
        heading: "Case Study: AI-Powered CRM",
        body: "For one client, we rebuilt their CRM around their exact pipeline stages and layered in AI-assisted lead scoring and automatic follow-up reminders.",
      },
      {
        heading: "Technologies",
        body: "Built on Node.js and PostgreSQL, with AI and automation tooling — Python, Claude, and LangChain — layered in where it genuinely improves the workflow.",
      },
    ],
    techStack: ["Node.js", "PostgreSQL", "Python", "Claude", "LangChain"],
    relatedCaseStudy: { title: "AI-Powered CRM Customization", href: "/products/1" },
    faqs: [
      {
        id: "crm-1",
        question: "Can you customize a CRM around our exact sales process?",
        answer:
          "Yes — that's exactly what we did for our AI-powered CRM case study: a system built around one team's exact pipeline stages rather than a generic template.",
      },
      {
        id: "crm-2",
        question: "What kind of automation can you add?",
        answer:
          "Automation that removes repetitive manual work — from lead scoring to automatic follow-up reminders — tailored to how your team actually operates.",
      },
    ],
    cta: { label: "Automate Your Business", href: "/contact" },
  },

  "digital-marketing": {
    title: "Digital Marketing & Brand Promotion Services",
    seoTitle: "Digital Marketing Company | GLOARO Pvt Ltd",
    metaDescription:
      "Strategic digital marketing and brand promotion from GLOARO — campaigns that grow visibility and generate leads.",
    primaryKeyword: "digital marketing company",
    intro:
      "GLOARO runs strategic digital marketing and brand promotion campaigns that grow visibility, generate leads, and turn audiences into customers.",
    sections: [
      {
        heading: "What We Offer",
        body: "Brand promotion and marketing campaigns built around your business goals — from growing visibility to generating qualified leads.",
      },
      {
        heading: "Our Approach",
        body: "We pair marketing strategy with the same technical foundation behind our software work — fast, SEO-ready websites and landing pages that convert the traffic a campaign brings in.",
      },
    ],
    techStack: ["SEO", "Brand Promotion", "Content Strategy", "Analytics"],
    faqs: [
      {
        id: "dm-1",
        question: "Do you handle both strategy and execution?",
        answer:
          "Yes — we plan the campaign and build the technical pieces it depends on, like SEO-ready landing pages, in-house.",
      },
      {
        id: "dm-2",
        question: "How much does a marketing campaign cost?",
        answer:
          "Cost depends on scope and channels. Share your goals through our contact form and we'll provide a transparent quote.",
      },
    ],
    cta: { label: "Grow Your Brand", href: "/contact" },
  },

  "cloud-it-solutions": {
    title: "Cloud & IT Solutions",
    seoTitle: "Cloud & IT Solutions Company | GLOARO Pvt Ltd",
    metaDescription:
      "Cloud architecture, IT consulting, and infrastructure support from GLOARO — reliable systems on AWS, GCP, and Vercel.",
    primaryKeyword: "cloud solutions company",
    intro:
      "GLOARO provides cloud architecture, IT consulting, and infrastructure support that keeps your business reliable, secure, and cost-efficient.",
    sections: [
      {
        heading: "What We Offer",
        body: "Cloud architecture, deployment pipelines, and IT consulting — for teams that need reliable infrastructure without an in-house DevOps team.",
      },
      {
        heading: "Cloud Platforms We Use",
        body: "We deploy and manage infrastructure across AWS, Google Cloud, Vercel, and Cloudflare, with Docker and GitHub Actions for consistent, repeatable deployments.",
      },
    ],
    techStack: ["AWS", "Google Cloud", "Vercel", "Cloudflare", "Docker", "GitHub Actions"],
    faqs: [
      {
        id: "cl-1",
        question: "Can you migrate our existing infrastructure to the cloud?",
        answer:
          "Yes — we assess your current setup during requirement analysis and plan a migration path that fits your budget and downtime constraints.",
      },
      {
        id: "cl-2",
        question: "Do you provide ongoing infrastructure support?",
        answer:
          "Yes. Every project includes a post-launch support window, plus ongoing maintenance plans for continued monitoring after that.",
      },
    ],
    cta: { label: "Talk to a Cloud Specialist", href: "/contact" },
  },

  "ui-ux-design": {
    title: "UI/UX Design Services",
    seoTitle: "UI/UX Design Company | GLOARO Pvt Ltd",
    metaDescription:
      "GLOARO designs effortless, high-converting interfaces — from wireframes to high-fidelity UI for web and mobile products.",
    primaryKeyword: "UI UX design company",
    intro:
      "GLOARO designs wireframes and high-fidelity interfaces that make every interaction feel effortless — for web and mobile products alike.",
    sections: [
      {
        heading: "Our Design Process",
        body: "Design is built into every project's second phase — wireframes and high-fidelity mockups are crafted before a single line of production code is written.",
      },
      {
        heading: "What's Included",
        body: "User flows, wireframes, and polished UI design for web and mobile products, handed off ready for development.",
      },
    ],
    techStack: ["Wireframing", "High-Fidelity UI", "Responsive Design"],
    relatedCaseStudy: { title: "See Our Featured Projects", href: "/#projects" },
    faqs: [
      {
        id: "ux-1",
        question: "Is UI/UX design included in a development project, or separate?",
        answer:
          "It's built into our standard process as its own phase, but we also take on design-only engagements if you already have a development team.",
      },
      {
        id: "ux-2",
        question: "Do you design for mobile as well as web?",
        answer:
          "Yes — we design interfaces for both web and the cross-platform mobile apps we build with Flutter and React Native.",
      },
    ],
    cta: { label: "Start a Design Project", href: "/contact" },
  },

  "business-consulting": {
    title: "Business Consulting & Growth Strategy",
    seoTitle: "Business Consulting & Growth Strategy | GLOARO Pvt Ltd",
    metaDescription:
      "Practical strategy and consulting support from GLOARO to help founders build future-ready, technology-driven businesses.",
    primaryKeyword: "business consulting company",
    intro:
      "GLOARO provides practical strategy and consulting support that helps founders and teams build future-ready, technology-driven businesses.",
    sections: [
      {
        heading: "What We Help With",
        body: "Technology strategy, digital transformation planning, and growth-stage guidance for founders and teams building technology-driven businesses.",
      },
      {
        heading: "Our Approach",
        body: "We combine hands-on software delivery experience with practical strategy — advice grounded in what's actually feasible to build and maintain.",
      },
    ],
    techStack: ["Technology Strategy", "Digital Transformation", "Growth Planning"],
    faqs: [
      {
        id: "bc-1",
        question: "What does a consulting engagement look like?",
        answer:
          "We start with the same requirement analysis step we use for every project — understanding your business goals and constraints — then provide practical, actionable recommendations.",
      },
      {
        id: "bc-2",
        question: "Do you only advise on technology?",
        answer:
          "Our strongest guidance is where technology and business strategy meet — digital transformation and making the right build-vs-buy calls as you grow.",
      },
    ],
    cta: { label: "Book a Strategy Call", href: "/contact" },
  },
};
