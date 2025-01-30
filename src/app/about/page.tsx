"use client";

import React from "react";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import FloatingNetworkBackground from "@/components/floating-network";

const AboutPage: React.FC = () => {
  const theme = useTheme();

  return (
    <FloatingNetworkBackground nodeCount={30} connectionDistance={150} maxNodes={70}>
      <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center">
        <div className="mb-8">
          <h1 
            style={{ color: theme.accentColor }}
            className="text-4xl font-bold mb-4 flex items-center gap-2"
          >
            <Terminal className="w-8 h-8" />
            About Me
          </h1>
        </div>

        <Card style={{ background: `${theme.baseColor}CC`, color: theme.accentColor }}>
          <CardHeader>
            <CardTitle className={"text-2xl font-bold"}>
              Dhananjai Senthil Kumar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={"space-y-6"}>
              <p>
                I&apos;m a Computer Science student at Northeastern University, passionate about building innovative solutions using cutting-edge technologies.
              </p>
              
              <div>
                <h2 className={"text-xl font-semibold mb-2"}>
                  Education
                </h2>
                <p>
                  Bachelor of Science in Computer Science<br />
                  Northeastern University (Sep. 2021 – May 2025)<br />
                  Relevant Coursework: Reinforcement Learning, Machine Learning and Data Mining, 
                  Algorithms & Data, Object-Oriented Design, Artificial Intelligence
                </p>
              </div>

              <div>
                <h2 className={"text-xl font-semibold mb-2"}>
                  Skills & Expertise
                </h2>
                <p>
                  Proficient in full-stack development, machine learning, and cloud architecture. 
                  AWS certified with experience in multiple cloud platforms and modern development frameworks.
                </p>
              </div>

              <div>
                <h2 className={"text-xl font-semibold mb-2"}>
                  Current Work
                </h2>
                <p>
                  Currently working as a Software Engineering Intern at Cloud303, 
                  where I&apos;m developing ML pipelines and fullstack applications, 
                  while also exploring innovative solutions in bio-informatics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FloatingNetworkBackground>
  );
};

export default AboutPage;