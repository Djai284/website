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

import projectImage from '../images/logo-alt-with-background.jpeg';

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
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with React and Node.js",
    image: projectImage?.src || '/images/logo-alt-with-background.jpeg',
    timeline: "Jan 2024 - Present",
    status: "In Progress",
    types: ["Frontend", "Backend", "Full Stack"],
    details: "This project implements a modern e-commerce solution with features including user authentication, product management, shopping cart, and payment processing integration...",
  },
  {
    id: 2,
    title: "Machine Learning Model",
    description: "Image classification model using TensorFlow",
    image: projectImage?.src || '/images/logo-alt-with-background.jpeg',
    timeline: "Nov 2023 - Dec 2023",
    status: "Completed",
    types: ["AI/ML", "Python"],
    details: "Developed a deep learning model for image classification using TensorFlow. The model achieves 95% accuracy on the test dataset...",
  },
];

const ProjectPortfolio: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const theme = useTheme();

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
    backgroundColor: isActive ? theme.accentColor : 'transparent',
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
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setSelectedProject(null)}
          style={{ color: theme.baseColor }}
          className="flex items-center mb-4 hover:opacity-80 transition-opacity duration-300"
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

        <h1 style={{ color: theme.accentColor }} className="text-4xl font-bold mb-2">
          My Projects
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              style={{ 
                borderColor: theme.accentColor,
                '--tw-ring-color': theme.accentColor 
              } as React.CSSProperties}
              className="w-full text-gray-900 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
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
              className="px-3 py-1 rounded-full text-sm border transition-colors duration-300"
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
            className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2"
            style={{ borderColor: 'transparent' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = theme.accentColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
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