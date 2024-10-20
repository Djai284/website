"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/theme-provider";
import { twMerge } from "tailwind-merge";

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  skills: string[];
  url?: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Personal Website",
    description: "A showcase of my work and skills using Next.js and Tailwind CSS.",
    startDate: "2023-01-01",
    endDate: null,
    skills: ["Next.js", "TailwindCSS"],
    url: "https://jai.place",
  },
  {
    id: "2",
    name: "AI Chatbot",
    description: "Developing an AI-powered chatbot using natural language processing.",
    startDate: "2023-03-15",
    endDate: null,
    skills: ["Python", "NLP"],
  },
  {
    id: "3",
    name: "Mobile App",
    description: "A cross-platform mobile app built with React Native.",
    startDate: "2022-11-01",
    endDate: "2023-02-28",
    skills: ["React Native", "Expo"],
    url: "https://github.com/Djai284/mobile-app",
  },
];

const ProjectsTimeline: React.FC = () => {
  const theme = useTheme();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = Number(entry.target.getAttribute("data-id"));
            setVisibleItems((prev) => [...prev, itemId]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, root: null }
    );

    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: theme.baseColor, color: theme.accentColor }}>
      <h1 className="text-4xl font-bold mb-12 text-center">
        My Projects Roadmap
      </h1>
      <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
        <div className="absolute w-1 bg-gray-300 h-full left-1/2 transform -translate-x-1/2" style={{ backgroundColor: theme.accentColor }}></div>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            data-id={index}
            className={`timeline-item mb-16 relative flex ${
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`w-10 h-10 absolute top-0 rounded-full flex items-center justify-center z-10 ${
                index % 2 === 0 ? "-left-5" : "-right-5"
              } border-4 shadow-lg`}
              style={{ backgroundColor: theme.baseColor, borderColor: theme.accentColor, color: theme.accentColor }}
            >
              {index + 1}
            </div>
            <div
              className={`w-5/12 p-6 shadow-xl rounded-lg ${
                index % 2 === 0 ? "mr-auto" : "ml-auto"
              }`}
              style={{ backgroundColor: theme.baseColor, borderColor: theme.accentColor, borderWidth: '1px' }}
            >
              <h2 className="text-2xl font-semibold mb-3" style={{ color: theme.accentColor }}>
                {project.name}
              </h2>
              <p className="mb-4" style={{ color: theme.accentColor }}>
                {project.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm" style={{ color: theme.accentColor }}>
                  {project.startDate} - {project.endDate || "Present"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: theme.accentColor, color: theme.baseColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: theme.accentColor }}
                >
                  View Project →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTimeline;