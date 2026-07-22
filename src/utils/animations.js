export const easeBrand = [0.16, 1, 0.3, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeBrand },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeBrand } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeBrand },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.3, ease: easeBrand },
  },
};

export const hoverGlow = {
  rest: { boxShadow: "0 0 0 rgba(43, 70, 184, 0)" },
  hover: {
    boxShadow: "0 20px 45px -15px rgba(26, 44, 122, 0.35)",
    transition: { duration: 0.3, ease: easeBrand },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeBrand },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: easeBrand } },
};

export const viewportOnce = { once: true, margin: "-80px" };
