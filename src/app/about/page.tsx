"use client";

import React from "react";
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
  Tv2,
  HeartPulse,
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

// A reusable toggle component for expandable sections with smooth animation.
const ToggleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded pointer-events-auto">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-2 bg-transparent focus:outline-none"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-xl">{title}</span>
        </div>
        <span>{open ? <ArrowUp size={18} /> : <ArrowDown size={18} />}</span>
      </button>
      {/* The container is always rendered so that we can animate its max-height and opacity */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-2 space-y-2 text-lg">{children}</div>
      </div>
    </div>
  );
};

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
        <div
          className="pointer-events-auto cursor-pointer"
          onClick={() => router.push("/")}
        >
          <h1
            style={{ color: theme.accentColor }}
            className="text-4xl font-bold mb-4 flex items-center gap-2"
          >
            <Terminal className="w-8 h-8" />
            About Me
          </h1>
        </div>

        <Card
          style={{
            background: `${theme.baseColor}CC`,
            color: theme.accentColor,
          }}
        >
          <CardHeader className="pointer-events-auto">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              Dhananjai Senthilkumar
            </CardTitle>
            <div className="text-lg space-y-2">
              <p>
                I am a 4th year Computer Science student at Northeastern
                University, passionate about building innovative solutions to
                real problems using cutting-edge technology. I may not be the
                biggest or strongest in the room, but I&apos;m often the{" "}
                <strong>
                  ambitious, determined, and somewhat insane guy 😂
                </strong>{" "}
                who dreams big and juggles many ideas.
              </p>
              <p>
                I&apos;m on a journey of continuous learning and growth &mdash;
                both as a developer and as a person. I believe in sharing my
                work and connecting with others.
              </p>
              <p>Feel free to reach out to me on any of the platforms below:</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href="https://www.instagram.com/djai.sen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
                <a
                  href="https://x.com/Djai284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <Twitter size={18} />
                  Twitter
                </a>
                <a
                  href="https://www.youtube.com/@Dhananjai284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <Youtube size={18} />
                  YouTube
                </a>
                <a
                  href="https://github.com/Djai284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href="mailto:dhananjai284@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <Mail size={18} />
                  Gmail
                </a>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-md">
              <ToggleSection
                title="Idea/Project List"
                icon={<Lightbulb size={22} />}
              >
                <p>
                  Here are some ideas and projects I&apos;m either working on or
                  thinking about:
                </p>
                <ul className="pl-5 space-y-1">
                  <li className="flex items-center gap-2">
                    <Music2 size={18} />
                    <span>
                      <strong>Cymatics Lab</strong>: A music production and
                      geometric research project
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Microscope size={18} />
                    <span>
                      <strong>Automated Hydroponics</strong>: Exploring
                      sustainable living and self-reliance
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Bot size={18} />
                    <span>
                      <strong>AI Research Agent</strong>:
                      Building an agent orchestration platform for deep research
                    </span>
                  </li>
                </ul>
              </ToggleSection>

              <ToggleSection
                title="Music I'm Listening To"
                icon={<Music size={22} />}
              >
                <p>
                  Music is an integral part of life. It can make you smile after
                  a bad day or bring back memories of the past. Here&apos;s a
                  taste of what I&apos;m tuning into right now:
                </p>
                <ul className="pl-5 space-y-1">
                  <li className="flex items-center gap-2">
                    <Drumstick size={18} />
                    <span>
                      <strong>Breakcore</strong> &mdash; Beats for getting
                      things done
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Headphones size={18} />
                    <span>
                      <strong>EDM</strong> &mdash; Nostalgic hype vibes
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Guitar size={18} />
                    <span>
                      <strong>Jazz</strong> &mdash; Perfect for slowing down
                      and relaxing
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Disc size={18} />
                    <span>
                      <strong>Rap</strong> &mdash; Artists like Kendrick Lamar
                      for motivation and retrospection
                    </span>
                  </li>
                </ul>
                <p>
                  I&apos;m always open to new suggestions, so please share your
                  favorite tracks!
                </p>
                <p>
                  I&apos;m also dabbling in music production &mdash; any advice
                  is welcome.
                </p>
              </ToggleSection>

              <ToggleSection
                title="Movies, TV Shows &amp; Anime Watch List"
                icon={<Film size={22} />}
              >
                <p>
                  I love immersing myself in great storytelling. Here are some
                  of my current favorites and all-time classics:
                </p>
                <ul className="pl-5 space-y-1">
                  <li className="flex items-center gap-2">
                    <Popcorn size={18} />
                    <span>
                      <strong>Game of Thrones</strong> &mdash; A binge-worthy
                      epic
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clapperboard size={18} />
                    <span>
                      <strong>The Penguin</strong> &mdash; Currently watching
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Wind size={18} />
                    <span>
                      <strong>Naruto</strong> &mdash; Anime classic
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Flame size={18} />
                    <span>
                      <strong>Blue Lock</strong> &mdash; Recently started
                    </span>
                  </li>
                </ul>
                <p className="mt-2">
                  Got any recommendations? Drop your suggestions below or DM me
                  on Twitter!
                </p>
              </ToggleSection>

              <ToggleSection
                title="Sports &amp; Fitness"
                icon={<Dumbbell size={22} />}
              >
                <p>
                  I enjoy staying active with sports and calisthenics.
                  Here&apos;s a glimpse of my current routine:
                </p>
                <h3 className="font-bold mt-2">Calisthenics Workout</h3>
                <ul className="pl-5 space-y-1">
                  <li className="flex items-center gap-2">
                    <Weight size={18} />
                    <span>Planche Pushups: 3 sets of 5 reps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BicepsFlexed size={18} />
                    <span>Handstand Practice: 5 minutes wall-supported</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <WeightIcon size={18} />
                    <span>Pull-ups: 3 sets of 8 reps</span>
                  </li>
                </ul>
                <p className="mt-2">
                  Staying fit is key, and I&apos;m always looking to improve my
                  strength and endurance.
                </p>
                <h3 className="font-bold mt-2">Meal Plan</h3>
                <ul className="pl-5 space-y-1">
                  <li className="flex items-center gap-2">
                    <Beef size={18} />
                    <span>Grilled Chicken Breast with Quinoa &amp; Veggies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Fish size={18} />
                    <span>Baked Salmon with Brown Rice &amp; Broccoli</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Egg size={18} />
                    <span>Egg White Omelette with Spinach &amp; Mushrooms</span>
                  </li>
                </ul>
                <p className="mt-2">
                  I focus on healthy, high-protein meals while avoiding beef and
                  pork.
                </p>
              </ToggleSection>

              <ToggleSection
                title="Online Content"
                icon={<Globe size={22} />}
              >
                <p>
                  I engage with a mix of podcasts, YouTube channels, and tech
                  articles that inspire me.
                </p>
                <h3 className="font-bold mt-2">Podcasts I Enjoy</h3>
                <ul className="pl-5 space-y-1">
                  <li className="flex items-center gap-2">
                    <PanelRightOpen size={18} />
                    <span>Joe Rogan Experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <PanelRightOpen size={18} />
                    <span>The Diary of a CEO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <PanelRightOpen size={18} />
                    <span>The Chris Williamson Podcast</span>
                  </li>
                </ul>
                <p className="mt-2">
                  Have any podcast recommendations? I&apos;d love to hear them!
                </p>
              </ToggleSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </FloatingNetworkBackground>
  );
};

export default AboutPage;