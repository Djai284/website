"use client";
import React from "react";
import { useTheme } from "../../components/theme-provider";

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  status: "Ongoing" | "Completed" | "On Hold";
  skills: string[];
  url?: string;
  eventType: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "Personal Website",
    description: "A showcase of my work and skills using Next.js and Tailwind CSS.",
    startDate: "2023-01-01",
    endDate: null,
    status: "Ongoing",
    skills: ["Next.js", "TailwindCSS"],
    url: "https://jai.place",
    eventType: "personal",
    tags: ["web-development", "personal-projects"],
  },
  {
    id: "2",
    name: "AI Chatbot",
    description: "Developing an AI-powered chatbot using natural language processing.",
    startDate: "2023-03-15",
    endDate: null,
    status: "Ongoing",
    skills: ["Python", "NLP"],
    eventType: "work",
    tags: ["ai", "nlp"],
  },
  {
    id: "3",
    name: "Mobile App",
    description: "A cross-platform mobile app built with React Native.",
    startDate: "2022-11-01",
    endDate: "2023-02-28",
    status: "Completed",
    skills: ["React Native", "Expo"],
    url: "https://github.com/Djai284/mobile-app",
    eventType: "work",
    tags: ["react-native", "mobile-app"],
  },
];

const ProjectsTimeline: React.FC = () => {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.baseColor, color: theme.accentColor, padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        My Projects Roadmap
      </h1>
      
      <div>
        {projects.map((project, index) => (
          <div key={project.id} style={{ marginBottom: '20px', border: `1px solid ${theme.accentColor}`, padding: '10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{project.name}</h2>
            <p>{project.description}</p>
            <p>Start Date: {project.startDate}</p>
            <p>End Date: {project.endDate || "Ongoing"}</p>
            <p>Status: {project.status}</p>
            <p>Skills: {project.skills.join(", ")}</p>
            {project.url && <a href={project.url} style={{ color: theme.accentColor }}>View Project</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTimeline;