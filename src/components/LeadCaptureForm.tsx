"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// EmailJS credentials
const EMAILJS_SERVICE_ID = "service_15407fj"; 
const EMAILJS_TEMPLATE_ID = "template_0p730qd"; 
const EMAILJS_PUBLIC_KEY = "nOQjTyhmf3lf35LjP";

const LeadCaptureForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailDebug, setEmailDebug] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // The E-book URL
  const ebookUrl = 'https://datyiclsvdactlwepuyc.supabase.co/storage/v1/object/public/ebook//The%20Self-Sabotage%20Blueprint%20(Unlocked).pdf';

  // Initialize EmailJS once
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

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
    setEmailDebug('');
    
    try {
      // Prepare the template parameters - try all possible parameter names for recipient
      const templateParams = {
        user_name: fullName,
        user_email: email,
        ebook_url: ebookUrl,
        to_email: email,
        to_name: fullName,
        // Add these additional parameters to cover all possibilities
        to: email,
        recipient: email,
        email: email,
        reply_to: email,
        from_name: "Luke Schembri",
        subject: "Your Free E-Book Download!",
        message: `Your e-book is ready to download: ${ebookUrl}`
      };
      
      console.log('Sending email via EmailJS with params:', templateParams);
      
      // Send email using EmailJS
      try {
        // Using the more reliable sendForm method first
        const emailjsResult = await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current as HTMLFormElement,
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          }
        );
        
        console.log('EmailJS form success:', emailjsResult.text);
        setEmailDebug(`Email sent successfully via form method. Response: ${emailjsResult.text}`);
        setEmailSent(true);
      } catch (formError) {
        console.error('EmailJS form error:', formError);
        
        // Fall back to direct send method
        try {
          const sendResult = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
          );
          
          console.log('EmailJS send success:', sendResult.text);
          setEmailDebug(`Email sent successfully via direct send. Response: ${sendResult.text}`);
          setEmailSent(true);
        } catch (sendError) {
          console.error('EmailJS send error:', sendError);
          setEmailDebug(`Both email methods failed. Error: ${sendError instanceof Error ? sendError.message : 'Unknown error'}`);
          throw sendError;
        }
      }
      
      setIsSubmitted(true);
      setFullName('');
      setEmail('');
    } catch (error) {
      console.error('Error during form submission:', error);
      setServerError(error instanceof Error ? error.message : 'Failed to send email. You can still download the e-book below.');
      setEmailSent(false);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to skip directly to download
  const skipToDownload = () => {
    setIsSubmitted(true);
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
              
              <form ref={formRef} onSubmit={handleSubmit}>
                <motion.div 
                  variants={itemVariants}
                  className="mb-6"
                >
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="user_name" // Important: This name is used by EmailJS
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
                    name="user_email" // Important: This name is used by EmailJS
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="luke@example.com"
                  />
                  {/* Hidden inputs for all possible parameter names */}
                  <input type="hidden" name="ebook_url" value={ebookUrl} />
                  <input type="hidden" name="to_email" value={email} />
                  <input type="hidden" name="to" value={email} />
                  <input type="hidden" name="recipient" value={email} />
                  <input type="hidden" name="to_name" value={fullName} />
                  <input type="hidden" name="from_name" value="Luke Schembri" />
                  <input type="hidden" name="reply_to" value={email} />
                  <input type="hidden" name="subject" value="Your Free E-Book Download!" />
                  <input 
                    type="hidden" 
                    name="message" 
                    value={`Your e-book is ready to download: ${ebookUrl}`} 
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
                  {emailDebug && process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-gray-400 mt-1 bg-gray-50 p-2 rounded">{emailDebug}</p>
                  )}
                </motion.div>
              ) : (
                <motion.div>
                  <motion.p 
                    className="text-lg text-gray-600 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Your e-book is ready to download.
                  </motion.p>
                  {emailDebug && process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded mx-auto max-w-md">{emailDebug}</p>
                  )}
                </motion.div>
              )}
              
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <motion.a 
                  href={ebookUrl}
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