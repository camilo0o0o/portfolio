'use client';

import { motion } from 'framer-motion';



export default function Projects() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen transition-colors duration-500 bg-cg-bg-grey"
    >
      <div className="mb-12 flex justify-center items-center">
        <p className="text-lg text-gray-600 max-w-2xl">
          Work in progress...
        </p>
      </div>
    </motion.main>
  );
} 