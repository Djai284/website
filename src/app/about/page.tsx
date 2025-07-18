"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Instagram, 
  Twitter, 
  Youtube, 
  Github, 
  Mail,
  Lightbulb,
  Music,
  Film,
  Dumbbell,
  Globe,
  ArrowUp,
  ArrowDown,
  Music2,
  Microscope,
  Bot,
  Drumstick,
  Headphones,
  Guitar,
  Disc,
  Popcorn,
  Clapperboard,
  Wind,
  Flame,
  Weight,
  BicepsFlexed,
  Dumbbell as WeightIcon,
  Beef,
  Fish,
  Egg,
  PanelRightOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import FloatingNetworkBackground from "@/components/floating-network";
import { useRouter } from "next/navigation";

// Enhanced toggle component with smooth framer motion animations
const ToggleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}> = ({ title, icon, children, delay = 0 }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div 
      className="rounded pointer-events-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-2 bg-transparent focus:outline-none"
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
          <span className="font-semibold text-xl">{title}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3, ease: "easeInOut", delay: 0.1 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="p-2 space-y-2 text-lg">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Animated social link component
const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}> = ({ href, icon, children, delay = 0 }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 hover:underline"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ 
      scale: 1.05,
      x: 4,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    {children}
  </motion.a>
);

// Animated list item component
const AnimatedListItem: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}> = ({ icon, children, delay = 0 }) => (
  <motion.li 
    className="flex items-center gap-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ x: 4, transition: { duration: 0.2 } }}
  >
    <motion.div
      whileHover={{ scale: 1.2, rotate: 15 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.div>
    <span>{children}</span>
  </motion.li>
);

const AboutPage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <FloatingNetworkBackground
      nodeCount={30}
      connectionDistance={150}
      maxNodes={70}
    >
      <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center">
        <motion.div
          className="pointer-events-auto cursor-pointer"
          onClick={() => router.push("/")}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h1
            style={{ color: theme.accentColor }}
            className="text-4xl font-bold mb-4 flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Terminal className="w-8 h-8" />
            </motion.div>
            About Me
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card
            style={{
              background: `${theme.baseColor}CC`,
              color: theme.accentColor,
            }}
          >
            <CardHeader className="pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  Dhananjai Senthilkumar
                </CardTitle>
              </motion.div>
              
              <div className="text-lg space-y-2">
                {[
                  "I'm a recent Computer Science graduate from Northeastern University and an impact-driven developer who's passionate about building technology that genuinely makes a difference. I love creating products that people actually use and find helpful — whether it's streamlining workflows, solving everyday problems, or opening up new possibilities.",
                  "I'm on a continuous journey of learning, building, and growing — both as a developer and as a person. I believe in sharing my work, connecting with others, and contributing to the tech community.",
                  "Feel free to reach out to me on any of the platforms below:"
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  >
                    {text}
                  </motion.p>
                ))}
                
                <motion.div 
                  className="flex flex-wrap gap-4 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <SocialLink 
                    href="https://www.instagram.com/djai.sen/" 
                    icon={<Instagram size={18} />}
                    delay={0.1}
                  >
                    Instagram
                  </SocialLink>
                  <SocialLink 
                    href="https://x.com/Djai284" 
                    icon={<Twitter size={18} />}
                    delay={0.2}
                  >
                    Twitter
                  </SocialLink>
                  <SocialLink 
                    href="https://www.youtube.com/@Dhananjai284" 
                    icon={<Youtube size={18} />}
                    delay={0.3}
                  >
                    YouTube
                  </SocialLink>
                  <SocialLink 
                    href="https://github.com/Djai284" 
                    icon={<Github size={18} />}
                    delay={0.4}
                  >
                    GitHub
                  </SocialLink>
                  <SocialLink 
                    href="mailto:dhananjai284@gmail.com" 
                    icon={<Mail size={18} />}
                    delay={0.5}
                  >
                    Gmail
                  </SocialLink>
                </motion.div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 text-md">
                <ToggleSection
                  title="Idea/Project List"
                  icon={<Lightbulb size={22} />}
                  delay={0.1}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Here are some impact-focused projects I'm either working on or thinking about — all aimed at solving real problems:
                  </motion.p>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<Music2 size={18} />} delay={0.1}>
                      <strong>Cymatics Lab</strong>: Making music production more accessible through geometric research and intuitive tools
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Microscope size={18} />} delay={0.2}>
                      <strong>Automated Hydroponics</strong>: Democratizing sustainable food production for urban environments
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Bot size={18} />} delay={0.3}>
                      <strong>AI Research Agent</strong>: Building tools that make deep research faster and more accessible for everyone
                    </AnimatedListItem>
                  </ul>
                </ToggleSection>

                <ToggleSection
                  title="My Building Philosophy"
                  icon={<Lightbulb size={22} />}
                  delay={0.15}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    I believe the best technology solves real problems without getting in the way. My approach to building:
                  </motion.p>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<Bot size={18} />} delay={0.1}>
                      <strong>User-First Design</strong>: Start with the problem, not the technology
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Music2 size={18} />} delay={0.2}>
                      <strong>Rapid Iteration</strong>: Ship early, learn fast, improve constantly
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Microscope size={18} />} delay={0.3}>
                      <strong>Meaningful Impact</strong>: Every line of code should make someone's life better
                    </AnimatedListItem>
                  </ul>
                  <motion.p
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Whether it's automating tedious tasks, making complex tech accessible, or creating entirely new possibilities — I'm driven by the potential to create genuine value for users.
                  </motion.p>
                  <motion.p
                    className="mt-2 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: `${theme.accentColor}80` }}
                  >
                    Fresh out of university and excited to bring this mindset to a team that shares the same passion for building meaningful products.
                  </motion.p>
                </ToggleSection>

                <ToggleSection
                  title="Music I'm Listening To"
                  icon={<Music size={22} />}
                  delay={0.25}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Music is an integral part of life. It can make you smile after a bad day or bring back memories of the past. Here's a taste of what I'm tuning into right now:
                  </motion.p>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<Drumstick size={18} />} delay={0.1}>
                      <strong>Breakcore</strong> — Beats for getting things done
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Headphones size={18} />} delay={0.2}>
                      <strong>EDM</strong> — Nostalgic hype vibes
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Guitar size={18} />} delay={0.3}>
                      <strong>Jazz</strong> — Perfect for slowing down and relaxing
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Disc size={18} />} delay={0.4}>
                      <strong>Rap</strong> — Artists like Kendrick Lamar for motivation and retrospection
                    </AnimatedListItem>
                  </ul>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    I'm always open to new suggestions, so please share your favorite tracks!
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    I'm also dabbling in music production — any advice is welcome.
                  </motion.p>
                </ToggleSection>

                <ToggleSection
                  title="Movies, TV Shows & Anime Watch List"
                  icon={<Film size={22} />}
                  delay={0.35}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    I love immersing myself in great storytelling. Here are some of my current favorites and all-time classics:
                  </motion.p>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<Popcorn size={18} />} delay={0.1}>
                      <strong>Game of Thrones</strong> — A binge-worthy epic
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Clapperboard size={18} />} delay={0.2}>
                      <strong>The Penguin</strong> — Currently watching
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Wind size={18} />} delay={0.3}>
                      <strong>Naruto</strong> — Anime classic
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Flame size={18} />} delay={0.4}>
                      <strong>Blue Lock</strong> — Recently started
                    </AnimatedListItem>
                  </ul>
                  <motion.p 
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Got any recommendations? Drop your suggestions below or DM me on Twitter!
                  </motion.p>
                </ToggleSection>

                <ToggleSection
                  title="Sports & Fitness"
                  icon={<Dumbbell size={22} />}
                  delay={0.45}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    I enjoy staying active with sports and calisthenics. Here's a glimpse of my current routine:
                  </motion.p>
                  
                  <motion.h3 
                    className="font-bold mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Calisthenics Workout
                  </motion.h3>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<Weight size={18} />} delay={0.1}>
                      Planche Pushups: 3 sets of 5 reps
                    </AnimatedListItem>
                    <AnimatedListItem icon={<BicepsFlexed size={18} />} delay={0.2}>
                      Handstand Practice: 5 minutes wall-supported
                    </AnimatedListItem>
                    <AnimatedListItem icon={<WeightIcon size={18} />} delay={0.3}>
                      Pull-ups: 3 sets of 8 reps
                    </AnimatedListItem>
                  </ul>
                  
                  <motion.p 
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Staying fit is key, and I'm always looking to improve my strength and endurance.
                  </motion.p>
                  
                  <motion.h3 
                    className="font-bold mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Meal Plan
                  </motion.h3>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<Beef size={18} />} delay={0.1}>
                      Grilled Chicken Breast with Quinoa & Veggies
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Fish size={18} />} delay={0.2}>
                      Baked Salmon with Brown Rice & Broccoli
                    </AnimatedListItem>
                    <AnimatedListItem icon={<Egg size={18} />} delay={0.3}>
                      Egg White Omelette with Spinach & Mushrooms
                    </AnimatedListItem>
                  </ul>
                  
                  <motion.p 
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    I focus on healthy, high-protein meals while avoiding beef and pork.
                  </motion.p>
                </ToggleSection>

                <ToggleSection
                  title="Online Content"
                  icon={<Globe size={22} />}
                  delay={0.55}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    I engage with a mix of podcasts, YouTube channels, and tech articles that inspire me.
                  </motion.p>
                  
                  <motion.h3 
                    className="font-bold mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Podcasts I Enjoy
                  </motion.h3>
                  <ul className="pl-5 space-y-1">
                    <AnimatedListItem icon={<PanelRightOpen size={18} />} delay={0.1}>
                      Joe Rogan Experience
                    </AnimatedListItem>
                    <AnimatedListItem icon={<PanelRightOpen size={18} />} delay={0.2}>
                      The Diary of a CEO
                    </AnimatedListItem>
                    <AnimatedListItem icon={<PanelRightOpen size={18} />} delay={0.3}>
                      The Chris Williamson Podcast
                    </AnimatedListItem>
                  </ul>
                  
                  <motion.p 
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Have any podcast recommendations? I'd love to hear them!
                  </motion.p>
                </ToggleSection>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </FloatingNetworkBackground>
  );
};

export default AboutPage;