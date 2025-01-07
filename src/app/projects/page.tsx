"use client";

import React, { useState } from "react";
import { Search, Grid, List, ArrowLeft, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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

// Sample project data - replace with your actual projects
const projectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with React and Node.js",
    image: "/api/placeholder/400/250",
    timeline: "Jan 2024 - Present",
    status: "In Progress",
    types: ["Frontend", "Backend", "Full Stack"],
    details:
      "This project implements a modern e-commerce solution with features including user authentication, product management, shopping cart, and payment processing integration...",
  },
  {
    id: 2,
    title: "Machine Learning Model",
    description: "Image classification model using TensorFlow",
    image: "/api/placeholder/400/250",
    timeline: "Nov 2023 - Dec 2023",
    status: "Completed",
    types: ["AI/ML", "Python"],
    details:
      "Developed a deep learning model for image classification using TensorFlow. The model achieves 95% accuracy on the test dataset...",
  },
];

const ProjectPortfolio: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const theme = useTheme();

  // Get unique project types
  const allTypes = Array.from(
    new Set(projectsData.flatMap((project) => project.types))
  );

  // Filter projects based on search term and selected types
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypes =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => project.types.includes(type));
    return matchesSearch && matchesTypes;
  });

  // Toggle type filter
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  interface StatusBadgeProps {
    status: Project["status"];
  }

  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

  interface TypeBadgeProps {
    type: string;
  }

  const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => (
    <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800 mr-2 mb-2">
      {type}
    </span>
  );

  if (selectedProject) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setSelectedProject(null)}
          className={cn(
            "flex items-center mb-4 transition-colors duration-300",
            `text-[${theme.baseColor}] hover:text-[${theme.accentColor}]`
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </button>

        <Card>
          {selectedProject.image && (
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          )}
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl font-bold">
                {selectedProject.title}
              </CardTitle>
              <StatusBadge status={selectedProject.status} />
            </div>
            <CardDescription>
              Timeline: {selectedProject.timeline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap mb-4">
              {selectedProject.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedProject.details}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1
          className={cn("text-3xl font-bold mb-4", `text-[${theme.baseColor}]`)}
        >
          My Projects
        </h1>

        {/* Search and View Toggle */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg",
                "focus:outline-none focus:ring-2",
                `focus:ring-[${theme.accentColor}]`
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded transition-colors duration-300",
                view === "grid"
                  ? `bg-[${theme.accentColor}] text-[${theme.baseColor}]`
                  : `hover:bg-[${theme.accentColor}] hover:text-[${theme.baseColor}]`
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-2 rounded transition-colors duration-300",
                view === "list"
                  ? `bg-[${theme.accentColor}] text-[${theme.baseColor}]`
                  : `hover:bg-[${theme.accentColor}] hover:text-[${theme.baseColor}]`
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-colors duration-300",
                selectedTypes.includes(type)
                  ? `bg-[${theme.baseColor}] text-[${theme.accentColor}]`
                  : `bg-muted hover:bg-[${theme.baseColor}/20] text-muted-foreground`
              )}
            >
              {type}
              {selectedTypes.includes(type) && (
                <X className="w-3 h-3 ml-1 inline-block" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid/List View */}
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
            className={cn(
              "cursor-pointer transition-shadow hover:shadow-lg",
              `hover:border-[${theme.accentColor}]`
            )}
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
                <CardTitle>{project.title}</CardTitle>
                <StatusBadge status={project.status} />
              </div>
              <CardDescription>Timeline: {project.timeline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{project.description}</p>
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
        <div className="text-center text-gray-500 py-8">
          No projects found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ProjectPortfolio;
