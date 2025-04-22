"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-capture-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-b from-indigo-100 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 50,
            damping: 10,
            delay: 0.2
          }}
        >
          Get Your <motion.span 
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >Free E-Book</motion.span> Today!
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Discover valuable insights and expert knowledge delivered straight to your inbox. 
          No strings attached, just pure value.
        </motion.p>
        <motion.button
          onClick={scrollToForm}
          className="bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get My Free E-Book
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection; 