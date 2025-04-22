"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AuthorBio = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 10,
              delay: 0.2
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src="https://datyiclsvdactlwepuyc.supabase.co/storage/v1/object/public/ebook//avatar.jpg"
              alt="Luke Schembri"
              className="w-full h-full object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              About the Author
            </motion.h2>
            <motion.h3 
              className="text-xl font-semibold text-primary mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Luke Schembri
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Luke Schembri is a recognized expert in the field with over 15 years of experience. 
              He has helped hundreds of clients achieve their goals through his proven methodologies
              and insights. This e-book distills his most valuable lessons learned throughout his career.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorBio; 