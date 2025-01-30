"use client";

import React, { useEffect, useState } from "react";
import { Search, Grid, List, ArrowLeft, X, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import projectImage from "../images/logo-alt-with-background.jpeg";
import FloatingNetworkBackground from "@/components/floating-network";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  timeline: string;
  status: "In Progress" | "Completed" | "Planned";
  types: string[];
  details: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "LotCreator",
    description: "Automated product appraisal platform that reduced processing time from 16 hours to 16 seconds using computer vision and LLMs",
    timeline: "Aug. 2023",
    status: "In Progress",
    types: ["Next.js", "React", "Firebase", "AI/ML", "Computer Vision"],
    details: "Built an end-to-end full stack application for managing auctions using MVC design. Leveraged GPT-4, Google Vision, and Selenium to automate product appraisal processes through computer vision models, scraping agents, and LLMs. The system dramatically improved efficiency by reducing processing time from 16 hours to just 16 seconds."
  },
  {
    id: 2,
    title: "rev",
    image: projectImage.src,
    description: "A hackerspace community platform connecting 350+ members using graph databases and embeddings",
    timeline: "Aug. 2023 - Present",
    status: "In Progress",
    types: ["Next.js", "React", "Supabase", "PostgreSQL", "Neo4j"],
    details: "Founded and built a thriving hackerspace community platform that grew to 350+ members within one semester. Developed rev connex, a sophisticated networking system using graph databases and embeddings to connect people and projects. Led educational initiatives including cohort workshops on Firebase and LLMs, and hosted events featuring notable tech venture capitalists like Cory Levy and Edward Lando."
  },
  {
    id: 3,
    title: "Automated Hydroponic Farm",
    description: "Smart farming system with automated pH control and computer vision-based harvesting",
    timeline: "May 2022",
    status: "Completed",
    types: ["Python", "IoT", "Computer Vision", "RaspberryPi"],
    details: "Developed an automated hydroponic farming system using RaspberryPi and motors to control pH and nutrient levels. Implemented computer vision using OpenCV to detect ripe fruit and automate harvesting processes. The system integrates hardware and software components including Streamlit for the interface, Supabase for data storage, and OpenCV for image processing."
  },
  {
    id: 4,
    title: "Autonomous Game Agent for Jetpack Joyride",
    description: "AI-powered game agent using genetic algorithms and Deep Q Learning",
    timeline: "Nov. 2023",
    status: "Completed",
    types: ["Python", "PyTorch", "AI/ML", "Gaming"],
    details: "Implemented an intelligent game agent for Jetpack Joyride using a combination of genetic algorithms and Deep Q Networks. The agent learns to play the game autonomously by training neural networks through reinforcement learning techniques. Built using Python with PyTorch for deep learning and PyGame for game interface."
  }
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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const theme = useTheme();
  const router = useRouter();

  const { count: nodeCount, max: maxNodes } = useResponsiveNodes();

  const allTypes = Array.from(
    new Set(projectsData.flatMap((project) => project.types))
  );

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypes =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => project.types.includes(type));
    return matchesSearch && matchesTypes;
  });

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
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
            className="text-2xl font-bold flex items-center mb-4 hover:underline pointer-events-auto pointer-events-auto"
          >
            <ArrowLeft className="w-8 h-8 mr-2" />
            Back to Projects
          </button>

          <Card style={{ background: `${theme.accentColor}CC` }}>
            {selectedProject.image && (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg pointer-events-auto"
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
                  "whitespace-pre-line",
                  getTextColors(theme.type).content
                )}
              >
                {selectedProject.details}
              </p>
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
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-grow max-w-md pointer-events-auto">
              <Search
                style={{ color: theme.accentColor }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              />
              <input
                type="text"
                style={{
                  borderColor: theme.accentColor,
                  outlineColor: theme.accentColor,
                  backgroundColor: `${theme.baseColor}80`,
                  color: theme.accentColor,
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline focus:outline-2"
                value={searchTerm}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={() => setView("grid")}
                style={getButtonStyle(view === "grid")}
                className="p-2 rounded border-2 transition-colors duration-300"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                style={getButtonStyle(view === "list")}
                className="p-2 rounded border-2 transition-colors duration-300"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                style={getButtonStyle(selectedTypes.includes(type))}
                className="px-3 py-1 rounded-full text-sm border-2 transition-colors duration-300 pointer-events-auto"
              >
                {type}
                {selectedTypes.includes(type) && (
                  <X className="w-3 h-3 ml-1 inline-block" />
                )}
              </button>
            ))}
          </div>
        </div>

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
              className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 pointer-events-auto"
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
                  className="w-full h-48 object-cover rounded-lg"
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
              <CardContent>
                <p className={cn("mb-4", getTextColors(theme.type).content)}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div
            style={{ color: theme.accentColor }}
            className="text-center text-gray-500 py-8"
          >
            No projects found matching your criteria
          </div>
        )}
      </div>
    </FloatingNetworkBackground>
  );
};

export default ProjectPortfolio;
