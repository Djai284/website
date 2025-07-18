"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/theme-provider";
import { twMerge } from "tailwind-merge";
import AnimatedImage from "./animations/animated-image";
import pfp from "../app/images/jai.png";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const titleTextVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
    },
  },
};

const emojiVariants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      type: "spring",
      stiffness: 200,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.5,
    },
  },
};

export const Content: React.FC = () => {
  const theme = useTheme();

  const navItems = [
    { name: "Blog", url: "https://blog.jai.place/" },
    { name: "Projects", url: "/projects" },
    { name: "About", url: "/about" },
    {
      name: "Resume",
      url: "https://firebasestorage.googleapis.com/v0/b/personal-website-f0071.appspot.com/o/dhananjai_resume.pdf?alt=media&token=338efb25-bfe3-4df1-aeb3-3707e7f0408b",
    },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Djai284" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dhananjai-senthilkumar/",
    },
    { name: "Twitter", url: "https://x.com/Djai284" },
  ];

  const getContainerStyle = () => {
    switch (theme.type) {
      case "light":
        return "bg-white bg-opacity-70 text-gray-800";
      case "dark":
        return "bg-gray-900 bg-opacity-70 text-white";
      default: // 'mid'
        return "bg-gray-700 bg-opacity-70 text-white";
    }
  };

  const getTextColor = () => {
    return theme.type === "light" ? "text-gray-800" : "text-white";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 pointer-events-none">
      <motion.div
        className={twMerge(
          "p-8 rounded-lg shadow-lg max-w-4xl w-full pointer-events-auto relative",
          getContainerStyle()
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 },
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          {/* Image Section */}
          <motion.div 
            className="md:w-1/3 mb-6 md:mb-0"
            variants={itemVariants}
          >
            <motion.div
              variants={imageVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedImage src={pfp} alt="Jai" width={192} height={192} />
            </motion.div>
            
            <motion.div 
              className="flex justify-center space-x-4 mt-4"
              variants={socialVariants}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  className="text-sm hover:underline transition-colors duration-300 pointer-events-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialItemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            className="md:w-2/3 md:pl-8"
            variants={itemVariants}
          >
            <motion.h1
              className={twMerge(
                "text-4xl md:text-5xl font-serif mb-4",
                getTextColor()
              )}
              variants={itemVariants}
            >
              <motion.span
                variants={titleTextVariants}
              >
                hey, i&apos;m jai
              </motion.span>
              <motion.span 
                style={{ color: theme.accentColor }}
                variants={emojiVariants}
                whileHover={{ 
                  rotate: [0, 20, -20, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {" "}👋
              </motion.span>
            </motion.h1>

            <motion.p
              className={twMerge(
                "text-lg md:text-xl font-serif mb-6 max-w-2xl mx-auto",
                getTextColor()
              )}
              variants={descriptionVariants}
            >
              i&apos;m a passionate builder who dabbles in all things tech, AI + ML, healthy living, and mindfulness. welcome
              to my corner of the internet!
            </motion.p>

            <motion.nav
              variants={itemVariants}
            >
              <motion.ul 
                className="flex flex-wrap justify-center gap-x-4 font-sans text-lg"
                variants={navVariants}
              >
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    variants={navItemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.a
                      href={item.url}
                      className="transition-colors duration-300 border-b-2 border-transparent hover:border-current pointer-events-auto relative overflow-hidden"
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">
                        {item.name}
                      </span>
                      
                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-current origin-left"
                        style={{ backgroundColor: theme.accentColor }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </motion.div>
        </div>

        {/* Subtle floating animation for the entire card */}
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};