"use client";

// Import the necessary hook for fetching data
import React, { useEffect, useState, useCallback } from "react";
import { Search, Grid, List, ArrowLeft, X, Home, ExternalLink } from "lucide-react";
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
  previewUrl?: string; // Added for storing platform URL to generate preview 
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

// Simplified filter categories based on your projects
const projectCategories = [
  "AI/ML", 
  "Web", 
  "Mobile",
  "Game Development",
  "DevOps",
  "Community",
  "Full Stack"
];

const getTextColors = (themeType: "light" | "mid" | "dark") => {
  switch (themeType) {
    case "dark":
      return {
        title: "text-white",
        description: "text-white",
        content: "text-white",
      };
    case "light":
      return {
        title: "text-gray-900",
        description: "text-gray-600",
        content: "text-gray-700",
      };
    case "mid":
      return {
        title: "text-white",
        description: "text-white",
        content: "text-white",
      };
  }
};

const useResponsiveNodes = () => {
  const [nodes, setNodes] = useState({ count: 30, max: 70 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setNodes({ count: 15, max: 30 });
      } else if (width < 1024) { // tablet
        setNodes({ count: 20, max: 50 });
      } else { // desktop
        setNodes({ count: 30, max: 70 });
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return nodes;
};

const ProjectPortfolio: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  // Changed from single string to array of strings for multiple filter selection
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const theme = useTheme();
  const router = useRouter();

  const { count: nodeCount, max: maxNodes } = useResponsiveNodes();

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if ANY of the selected categories match ANY of the project types
    // If no categories are selected, show all projects
    const matchesCategory =
      selectedCategories.length === 0 ||
      project.types.some(type => 
        selectedCategories.some(category => 
          type.includes(category)
        )
      );
    
    return matchesSearch && matchesCategory;
  });

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      // If already selected, remove it
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } 
      // Otherwise add it
      else {
        return [...prev, category];
      }
    });
  };

  // Clear all selected categories
  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const getButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? theme.accentColor : `${theme.baseColor}80`,
    color: isActive ? theme.baseColor : theme.accentColor,
    borderColor: theme.accentColor,
  });

  const StatusBadge: React.FC<{ status: Project["status"] }> = ({ status }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case "completed":
          return "bg-green-100 text-green-800";
        case "in progress":
          return "bg-blue-100 text-blue-800";
        case "planned":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span className={cn("px-2 py-1 rounded-full text-sm", getStatusColor())}>
        {status}
      </span>
    );
  };

  const TypeBadge: React.FC<{ type: string }> = ({ type }) => (
    <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800 mr-2 mb-2">
      {type}
    </span>
  );

  if (selectedProject) {
    return (
      <FloatingNetworkBackground nodeCount={nodeCount} connectionDistance={150} maxNodes={maxNodes} >
        <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
          <button
            onClick={() => setSelectedProject(null)}
            style={{ color: theme.accentColor }}
            className="text-2xl font-bold flex items-center mb-4 hover:underline pointer-events-auto"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Projects
          </button>

          <Card style={{ background: `${theme.accentColor}CC` }}>
            {selectedProject.image && (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-lg pointer-events-auto"
              />
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle
                  className={cn(
                    "text-2xl font-bold",
                    getTextColors(theme.type).title
                  )}
                >
                  {selectedProject.title}
                </CardTitle>
                <StatusBadge status={selectedProject.status} />
              </div>
              <CardDescription
                className={cn(getTextColors(theme.type).description)}
              >
                Timeline: {selectedProject.timeline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap mb-4">
                {selectedProject.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
              <p
                className={cn(
                  "whitespace-pre-line mb-6",
                  getTextColors(theme.type).content
                )}
              >
                {selectedProject.details}
              </p>
              
              {selectedProject.links && selectedProject.links.length > 0 && (
                <div className="mt-4">
                  <h3 className={cn("font-semibold mb-2", getTextColors(theme.type).title)}>
                    Project Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full transition-colors duration-200 pointer-events-auto cursor-pointer"
                      >
                        {link.title}
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FloatingNetworkBackground>
    );
  }

  return (
    <FloatingNetworkBackground
      nodeCount={nodeCount}
      connectionDistance={150}
      maxNodes={maxNodes}
    >
      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
        <div className="mb-8">
          <h1
            style={{ color: theme.accentColor }}
            className="text-3xl font-bold mb-2 flex items-center pointer-events-auto"
          >
            <Home
              className="w-8 h-8 inline-block mr-2 hover:cursor-pointer"
              onClick={() => router.push('/')}
            />
            My Projects
          </h1>
          <p style={{ color: theme.accentColor }} className="mb-6 text-lg pointer-events-auto">
            A collection of my work across AI/ML, web development, games, and more
          </p>
          
          {/* Search and View Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-grow max-w-md pointer-events-auto">
              <Search
                style={{ color: theme.accentColor }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              />
              <input
                type="text"
                placeholder="Search projects..."
                style={{
                  borderColor: theme.accentColor,
                  outlineColor: theme.accentColor,
                  backgroundColor: `${theme.baseColor}80`,
                  color: theme.accentColor,
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline focus:outline-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={() => setView("grid")}
                style={getButtonStyle(view === "grid")}
                className="p-2 rounded border-2 transition-colors duration-300"
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                style={getButtonStyle(view === "list")}
                className="p-2 rounded border-2 transition-colors duration-300"
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-2 pointer-events-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span style={{ color: theme.accentColor }} className="font-medium">Filters:</span>
              <button
                onClick={clearAllCategories}
                className={`px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors duration-300 ${
                  selectedCategories.length > 0 ? "border border-red-300 text-red-500" : "border border-gray-300 text-gray-400"
                }`}
                disabled={selectedCategories.length === 0}
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  style={getButtonStyle(selectedCategories.includes(category))}
                  className="px-3 py-1 rounded-full text-sm border-2 transition-colors duration-300 flex items-center"
                >
                  {category}
                  {selectedCategories.includes(category) && (
                    <X className="w-3 h-3 ml-1 inline-block" />
                  )}
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <div className="text-sm mb-2" style={{ color: theme.accentColor }}>
                Showing projects matching: {selectedCategories.join(", ")}
              </div>
            )}
          </div>

          {/* Project Grid/List */}
          <div
            className={cn(
              "grid gap-6",
              view === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 pointer-events-auto flex flex-col h-full"
                style={{
                  borderColor: "transparent",
                  background: `${theme.accentColor}CC`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    theme.accentColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "transparent";
                }}
                onClick={() => setSelectedProject(project)}
              >
                {project.image && view === "grid" && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className={cn(getTextColors(theme.type).title)}>
                      {project.title}
                    </CardTitle>
                    <StatusBadge status={project.status} />
                  </div>
                  <CardDescription
                    className={cn(getTextColors(theme.type).description)}
                  >
                    Timeline: {project.timeline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className={cn("mb-4", getTextColors(theme.type).content)}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.types.slice(0, 3).map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                    {project.types.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        +{project.types.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className={cn(getTextColors(theme.type).title)}>
                  <button
                    className="flex items-center text-sm font-semibold px-4 py-2 duration-300 hover:underline"
                    style={{ color: getTextColors(theme.type).content }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div
              style={{ color: theme.accentColor }}
              className="text-center py-8 pointer-events-auto"
            >
              <p className="text-xl mb-2">No projects found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories([]);
                }}
                className="underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </FloatingNetworkBackground>
  );
};

export default ProjectPortfolio;