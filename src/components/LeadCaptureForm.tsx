"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LeadCaptureForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // For direct download use
  const ebookUrl = 'https://datyiclsvdactlwepuyc.supabase.co/storage/v1/object/public/ebook//My%20Ebook.pdf';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setServerError('');
    
    try {
      console.log('Submitting to API...');
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
        }),
      });
      
      const data = await response.json();
      console.log('API response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong with the submission');
      }
      
      // Store the download URL
      setDownloadUrl(data.downloadUrl || ebookUrl);
      
      // Check if email was sent
      setEmailSent(data.emailSent || false);
      
      setIsSubmitted(true);
      setFullName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setServerError(error instanceof Error ? error.message : 'Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to skip the database and go straight to download
  const skipToDownload = () => {
    setIsSubmitted(true);
    setDownloadUrl(ebookUrl);
  };

  return (
    <section id="lead-capture-form" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <motion.div 
          className="bg-white shadow-xl rounded-xl p-8 sm:p-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {!isSubmitted ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-gray-900 mb-6 text-center"
              >
                Get Your Free E-Book
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 mb-8 text-center"
              >
                Fill out the form below to download your free e-book.
              </motion.p>
              
              {serverError && (
                <motion.div 
                  variants={itemVariants}
                  className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg"
                >
                  <p>{serverError}</p>
                  <button 
                    onClick={skipToDownload}
                    className="mt-2 text-blue-600 underline hover:text-blue-800"
                  >
                    Skip and download directly
                  </button>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <motion.div 
                  variants={itemVariants}
                  className="mb-6"
                >
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Luke Schembri"
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mb-8"
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="luke@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </motion.div>
                
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 flex justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Download My Free E-Book'
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <motion.svg 
                className="w-16 h-16 text-green-500 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </motion.svg>
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Thank You!
              </motion.h2>
              
              {emailSent ? (
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg text-gray-600">
                    Your e-book has been sent to your email at <span className="font-semibold">{email || 'your registered email'}</span>.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    If you don't see it, please check your spam folder.
                  </p>
                </motion.div>
              ) : (
                <motion.p 
                  className="text-lg text-gray-600 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Your e-book is ready to download.
                </motion.p>
              )}
              
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <motion.a 
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Your E-Book
                </motion.a>
                
                {emailSent && (
                  <motion.p 
                    className="text-sm text-gray-500 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    You can also download it directly using the button above if you prefer.
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureForm; 