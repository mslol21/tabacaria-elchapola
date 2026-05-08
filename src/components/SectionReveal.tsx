import React from 'react';
import { motion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

const SectionReveal: React.FC<SectionRevealProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
