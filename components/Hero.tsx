"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 2.1, // Added 2 seconds delay
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5, // 1.5 seconds after heading appears
        duration: 0.5,
      },
    },
  };

  const text = "Revolutionary technology that transforms the way you live, work, and connect with the world around you.";
  
  // Calculate total typewriter duration
  const typewriterStartDelay = 3.6; // 2s initial + 1.5s after heading
  const typewriterDuration = text.length * 0.03; // 30ms per character
  const buttonDelay = typewriterStartDelay + typewriterDuration + 0.3; // Add 300ms buffer after typewriter completes

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: buttonDelay, // Appears after typewriter effect fully completes
      },
    },
  };

  return (
    <div className="h-[700px] w-full bg-gray-900 max-lg:h-[900px] max-md:h-[750px]">
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
        <motion.div 
          className="flex flex-col gap-y-5 max-lg:order-last col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl"
            variants={headingVariants}
          >
            THE PRODUCT OF THE FUTURE
          </motion.h1>
          
          <motion.div
            variants={typewriterVariants}
            className="text-white max-sm:text-sm min-h-[4rem]"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: typewriterStartDelay }}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: typewriterStartDelay + index * 0.03, // Each character appears with 30ms delay
                    duration: 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: buttonDelay, // Calculated to appear after typewriter completes
            }}
          >
            <button className="bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100 transition-colors">
              BUY NOW
            </button>
            <button className="bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100 transition-colors">
              LEARN MORE
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          transition={{ 
            duration: 0.8, 
            delay: 2.1, // Same timing as heading (appears alongside)
            ease: "easeOut" 
          }}
        >
          <Image
            src="/watch for banner.png"
            width={400}
            height={400}
            alt="smart watch"
            className="max-md:w-[300px] max-md:h-[300px] max-sm:h-[250px] max-sm:w-[250px] w-auto h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
