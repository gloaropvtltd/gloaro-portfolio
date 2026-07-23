"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations";

export default function Template({ children }) {
  return (
    <motion.div initial="initial" animate="animate" variants={pageTransition}>
      {children}
    </motion.div>
  );
}
