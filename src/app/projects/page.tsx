"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Search, Grid, List, ArrowLeft, X, Home, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import FloatingNetworkBackground from "@/components/floating-network";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  previewImage?: string;
  previewUrl?: string;
  timeline: string;
  status: "In Progress" | "Completed" | "Planned";
  types: string[];
  details: string;
  links?: {
    title: string;
    url: string;
  }[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Exercise Activity Recognition",
    description: "Custom-trained CNN model for recognizing gym exercises on embedded devices like smartwatches",
    timeline: "Jan 2023 - Apr 2023",
    status: "Completed",
    types: ["Machine Learning", "Mobile", "iOS", "TensorFlow", "Health & Fitness"],
    details: "Developed a custom trained activity recognition model to identify gym exercises automatically using Convolutional Neural Networks. The model is designed to run locally on embedded devices such as smartwatches, providing real-time feedback without cloud dependencies. The project consists of two parts: a trained machine learning model with TensorFlow and an iOS application that implements the model for real-world use.",
    links: [
      {
        title: "ML Model Repository",
        url: "https://github.com/Djai284/smartwatch-activity-recognition"
      },
      {
        title: "iOS App Repository",
        url: "https://github.com/Djai284/exercise-activity-recognizer"
      }
    ]
  },
  {
    id: 2,
    title: "Cats vs K9s",
    description: "A fun twist on the tower defense genre inspired by Plants vs Zombies",
    timeline: "Oct 2022",
    status: "Completed",
    types: ["Game Development", "Web", "JavaScript"],
    details: "Developed a browser-based tower defense game inspired by the mechanics of Plants vs Zombies but with a unique cat and dog theme. The game features multiple levels, different types of defender cats and enemy dogs, and resource management mechanics. Built with JavaScript for cross-platform compatibility.",
    links: [
      {
        title: "Game Repository",
        url: "https://github.com/Djai284/cats-vs-k9s"
      }
    ]
  },
  {
    id: 3,
    title: "AWS Remix",
    description: "Tool for summarizing AWS account resources in AI-friendly formats",
    timeline: "Nov 2023",
    status: "Completed",
    types: ["DevOps", "AWS", "Cloud", "Python"],
    details: "Created a utility that analyzes entire AWS accounts and generates comprehensive summaries in formats optimized for AI consumption. The tool helps developers and architects quickly understand complex AWS setups, simplifies infrastructure auditing, and makes it easier to discuss cloud architecture with AI assistants.",
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/Djai284/aws-remix"
      }
    ]
  },
  {
    id: 4,
    title: "rev",
    description: "A hackerspace community platform connecting 350+ members in the Boston area",
    timeline: "Aug 2023 - Present",
    status: "In Progress",
    types: ["Community", "Web", "Next.js", "Graph Databases"],
    details: "Founded and built a thriving hackerspace community platform that grew to 350+ members within one semester. Developed rev connex, a sophisticated networking system using graph databases and embeddings to connect people and projects. Led educational initiatives including cohort workshops on Firebase and LLMs, and hosted events featuring notable tech venture capitalists like Cory Levy and Edward Lando.",
    links: [
      {
        title: "Official Website",
        url: "https://www.rev.school/"
      }
    ],
    previewUrl: "https://www.rev.school/"
  },
  {
    id: 5,
    title: "Autonomous Game Agent for Jetpack Joyride",
    description: "AI-powered game agent using genetic algorithms and neural networks",
    timeline: "Nov 2023",
    status: "Completed",
    types: ["AI/ML", "Game AI", "Python", "Neural Networks"],
    details: "Implemented an intelligent game agent for Jetpack Joyride using a combination of genetic algorithms and neural networks built from scratch. The agent learns to play the game autonomously, improving its performance over multiple generations of training. The project demonstrates practical applications of evolutionary algorithms in reinforcement learning scenarios.",
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/Djai284/JetpackJoyrideRL"
      }
    ]
  },
  {
    id: 6,
    title: "Mayura Studios",
    description: "Technical venture studio specializing in full-stack AI application development",
    timeline: "Feb 2024 - Present",
    status: "In Progress",
    types: ["AI/ML", "Consulting", "Full Stack", "Venture Studio"],
    details: "Co-founded a technical venture studio and consulting firm focusing on cutting-edge AI application development. Mayura Studios builds custom AI solutions for businesses while also incubating internal projects that leverage the latest in machine learning and artificial intelligence technologies.",
    links: [
      {
        title: "Studio Website",
        url: "https://mayura.studio"
      }
    ],
    previewUrl: "https://mayura.studio"
  },
  {
    id: 7,
    title: "LotCreator",
    description: "AI-powered auction management platform that reduced appraisal processing time from 16 hours to 16 seconds",
    timeline: "Aug 2023 - Present",
    status: "In Progress",
    types: ["AI/ML", "Web", "E-commerce", "Computer Vision"],
    details: "Built an end-to-end full stack application for managing auctions using MVC design. Leveraged GPT-4, Google Vision, and Selenium to automate product appraisal processes through computer vision models, scraping agents, and LLMs. The system dramatically improved efficiency by reducing processing time from 16 hours to just 16 seconds.",
    links: [
      {
        title: "Platform Website",
        url: "https://lotcreator.com/"
      }
    ],
    previewUrl: "https://lotcreator.com/"
  }
];

const projectCategories = [
  "AI/ML", 
  "Web", 
  "Mobile",
  "Game Development",
  "DevOps",
  "Community",
  "Full Stack"
];

// Clean Tag Component with Framer Motion
const ProjectTag: React.FC<{ 
  tag: string; 
  index: number;
  isHighlighted?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  theme: any;
}> = ({ tag, index, isHighlighted = false, onClick, theme }) => {
  return (
    <motion.span
      initial={{ scale: 0.96 }}
      animate={{ scale: 1 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.2,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.08,
        transition: { duration: 0.15 }
      }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer pointer-events-auto",
        isHighlighted ? "ring-2 ring-offset-2" : ""
      )}
      style={{
        backgroundColor: isHighlighted ? theme.accentColor : `${theme.accentColor}20`,
        color: isHighlighted ? theme.baseColor : theme.accentColor,
      }}
      onClick={onClick}
    >
      {tag}
    </motion.span>
  );
};

// Enhanced Project Card with clean design
const EnhancedProjectCard: React.FC<{
  project: Project;
  theme: any;
  onSelect: (project: Project) => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  autoExpand?: boolean;
}> = ({ project, theme, onSelect, selectedTags, onTagClick, autoExpand = false }) => {
  const [isExpanded, setIsExpanded] = useState(autoExpand);

  // Auto-expand when autoExpand prop changes
  useEffect(() => {
    if (autoExpand) {
      setIsExpanded(true);
    }
  }, [autoExpand]);

  const getStatusColor = (status: Project["status"]) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      case "planned":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group pointer-events-auto"
    >
      <Card
        className="cursor-pointer transition-all duration-300 border-2 overflow-hidden h-full pointer-events-auto"
        style={{
          borderColor: "transparent",
          background: `linear-gradient(135deg, ${theme.accentColor}10 0%, ${theme.accentColor}20 100%)`,
          backdropFilter: 'blur(10px)',
        }}
        onClick={() => !isExpanded && onSelect(project)}
      >
        {/* Status indicator */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div 
            className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {project.image && (
          <div className="h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <CardHeader className="pb-2">
          <CardTitle className="text-xl" style={{ color: theme.accentColor }}>
            {project.title}
          </CardTitle>
          <CardDescription style={{ color: `${theme.accentColor}80` }}>
            {project.timeline}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p style={{ color: `${theme.accentColor}90` }}>
            {project.description}
          </p>
          
          {/* Clean tag display */}
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {project.types.map((type, index) => (
                <ProjectTag
                  key={type}
                  tag={type}
                  index={index}
                  isHighlighted={selectedTags.includes(type)}
                  onClick={(e) => {
                    e?.stopPropagation();
                    onTagClick(type);
                  }}
                  theme={theme}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Expandable details section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto", 
                  marginTop: 16,
                  transition: {
                    height: { duration: 0.4, ease: "easeInOut" },
                    opacity: { duration: 0.3, delay: 0.1 },
                    marginTop: { duration: 0.4, ease: "easeInOut" }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0, 
                  marginTop: 0,
                  transition: {
                    opacity: { duration: 0.2 },
                    height: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
                    marginTop: { duration: 0.3, ease: "easeInOut", delay: 0.1 }
                  }
                }}
                className="pt-4 border-t space-y-4 overflow-hidden"
                style={{ borderColor: `${theme.accentColor}30` }}
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              >
                <motion.p 
                  style={{ color: `${theme.accentColor}90` }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2, duration: 0.3 }
                  }}
                  exit={{ opacity: 0, y: -5, transition: { duration: 0.2 } }}
                >
                  {project.details}
                </motion.p>
                
                {project.links && project.links.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.3, duration: 0.3 }
                    }}
                    exit={{ opacity: 0, y: -5, transition: { duration: 0.2 } }}
                  >
                    {project.links.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors duration-200 pointer-events-auto"
                        style={{
                          background: `${theme.accentColor}20`,
                          color: theme.accentColor,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { 
                            delay: 0.4 + (index * 0.1), 
                            duration: 0.2,
                            ease: "easeOut"
                          }
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: `${theme.accentColor}30`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.title}
                        <ExternalLink size={12} />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/Collapse button */}
          <motion.button
            onClick={(e: { stopPropagation: () => void; }) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center gap-2 text-sm font-medium transition-colors pointer-events-auto"
            style={{ color: theme.accentColor }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const useResponsiveNodes = () => {
  const [nodes, setNodes] = useState({ count: 30, max: 70 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setNodes({ count: 15, max: 30 });
      } else if (width < 1024) {
        setNodes({ count: 20, max: 50 });
      } else {
        setNodes({ count: 30, max: 70 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return nodes;
};

const ProjectPortfolio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const theme = useTheme();
  const router = useRouter();

  const { count: nodeCount, max: maxNodes } = useResponsiveNodes();

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategories.length === 0 ||
      project.types.some(type => 
        selectedCategories.some(category => 
          type.includes(category)
        )
      );
    
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleTagClick = (tag: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(tag)) {
        return prev.filter(c => c !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const getButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? theme.accentColor : `${theme.baseColor}80`,
    color: isActive ? theme.baseColor : theme.accentColor,
    borderColor: theme.accentColor,
  });

  // Project detail view
  if (selectedProject) {
    return (
      <FloatingNetworkBackground nodeCount={nodeCount} connectionDistance={150} maxNodes={maxNodes}>
        <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
          <motion.button
            onClick={() => setSelectedProject(null)}
            style={{ color: theme.accentColor }}
            className="text-2xl font-bold flex items-center mb-4 hover:underline pointer-events-auto"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Projects
          </motion.button>

          <EnhancedProjectCard
            project={selectedProject}
            theme={theme}
            onSelect={() => {}}
            selectedTags={selectedCategories}
            onTagClick={handleTagClick}
            autoExpand={true}
          />
        </div>
      </FloatingNetworkBackground>
    );
  }

  // Main projects view
  return (
    <FloatingNetworkBackground
      nodeCount={nodeCount}
      connectionDistance={150}
      maxNodes={maxNodes}
    >
      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
        <div className="mb-8">
          <motion.h1
            style={{ color: theme.accentColor }}
            className="text-3xl font-bold mb-2 flex items-center pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto"
            >
              <Home
                className="w-8 h-8 inline-block mr-2 hover:cursor-pointer pointer-events-auto"
                onClick={() => router.push('/')}
              />
            </motion.div>
            My Projects
          </motion.h1>
          <motion.p 
            style={{ color: theme.accentColor }} 
            className="mb-6 text-lg pointer-events-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A collection of my work across AI/ML, web development, games, and more
          </motion.p>
          
          {/* Search */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex-grow max-w-md pointer-events-auto">
              <Search
                style={{ color: theme.accentColor }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
              <input
                type="text"
                style={{
                  borderColor: theme.accentColor,
                  outlineColor: theme.accentColor,
                  backgroundColor: `${theme.baseColor}80`,
                  color: theme.accentColor,
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline focus:outline-2 transition-all duration-200 pointer-events-auto"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            className="mb-6 pointer-events-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span style={{ color: theme.accentColor }} className="font-medium">Filters:</span>
              <motion.button
                onClick={clearAllCategories}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 pointer-events-auto ${
                  selectedCategories.length > 0 ? "opacity-100" : "opacity-50"
                }`}
                style={{
                  border: `1px solid ${theme.accentColor}40`,
                  color: theme.accentColor,
                }}
                disabled={selectedCategories.length === 0}
                whileHover={{ scale: selectedCategories.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  style={getButtonStyle(selectedCategories.includes(category))}
                  className="px-3 py-1 rounded-full text-sm border-2 transition-all duration-200 flex items-center pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                  <AnimatePresence>
                    {selectedCategories.includes(category) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-3 h-3 ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {selectedCategories.length > 0 && (
                <motion.div 
                  className="text-sm mt-2" 
                  style={{ color: theme.accentColor }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Showing projects matching: {selectedCategories.join(", ")}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Project Grid */}
          <motion.div 
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    layout: { duration: 0.3 }
                  }}
                >
                  <EnhancedProjectCard
                    project={project}
                    theme={theme}
                    onSelect={setSelectedProject}
                    selectedTags={selectedCategories}
                    onTagClick={handleTagClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                style={{ color: theme.accentColor }}
                className="text-center py-8 pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl mb-2">No projects found matching your criteria</p>
                <motion.button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategories([]);
                  }}
                  className="underline transition-all duration-200 pointer-events-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FloatingNetworkBackground>
  );
};

export default ProjectPortfolio;