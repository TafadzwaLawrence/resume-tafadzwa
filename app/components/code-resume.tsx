"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions for the resume
interface Skill {
  name: string;
  level: number;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

interface Project {
  name: string;
  tech: string[];
  link?: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
}

// The Developer Class Data
const developerData = {
  name: "Tafadzwa L. Chitanga",
  title: "Software Engineer",
  email: "chitangalawrence03@gmail.com",
  phone: "+263 71 619 7323",
  location: "Harare, Zimbabwe",
  github: "github.com/TafadzwaLawrence",
  linkedin: "linkedin.com/in/tafadzwa-chitanga",

  skills: {
    languages: ["Java", "TypeScript", "JavaScript", "Python", "Dart", "SQL"],
    frameworks: ["Flutter", "React", "Next.js", "Node.js", "Spring Boot"],
    tools: ["Git", "Docker", "Linux", "PostgreSQL", "Firebase", "REST APIs"],
    soft: ["Problem Solving", "Communication", "Time Management", "Fast Learner"],
  },

  experience: [
    {
      company: "263Tickets",
      role: "Junior Software Engineer",
      duration: "Feb 2024 - Present",
      description: [
        "API development for ticketing platform",
        "Android application development in Java and Flutter",
        "Web development and maintenance",
        "Testing and debugging applications",
      ],
    },
    {
      company: "Zimpost Ltd Pvt",
      role: "IT Intern",
      duration: "Feb 2023 - Feb 2024",
      description: [
        "Network infrastructure maintenance",
        "System administration and maintenance",
        "Web development projects",
        "Server administration and cybersecurity",
      ],
    },
  ],

  projects: [
    {
      name: "263Tickets Platform",
      tech: ["Flutter", "Java", "REST APIs"],
      link: "https://263tickets.com/",
      description: "Event ticketing and management platform",
    },
    {
      name: "Social Beings",
      tech: ["React", "Node.js", "MongoDB"],
      description: "Social platform for community engagement",
    },
  ],

  education: [
    {
      institution: "Great Zimbabwe University",
      degree: "B.A. Information Systems",
      year: "2020 - Present",
    },
  ],

  hobbies: ["Chess", "Reading", "Coding"],
};

// Typing Animation Hook
function useTypingEffect(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// Line Number Component
function LineNumber({ num }: { num: number }) {
  return (
    <span className="select-none text-neutral-500 w-8 inline-block text-right mr-4 text-sm">
      {num}
    </span>
  );
}

// Syntax Highlighting Components (VS Code One Dark Pro Theme)
function Keyword({ children }: { children: React.ReactNode }) {
  return <span className="text-purple-400 font-medium">{children}</span>;
}

function ClassName({ children }: { children: React.ReactNode }) {
  return <span className="text-yellow-300 font-medium">{children}</span>;
}

function Property({ children }: { children: React.ReactNode }) {
  return <span className="text-red-400">{children}</span>;
}

function StringValue({ children }: { children: React.ReactNode }) {
  return <span className="text-green-400">"{children}"</span>;
}

function Comment({ children }: { children: React.ReactNode }) {
  return <span className="text-neutral-500 italic">// {children}</span>;
}

function Method({ children }: { children: React.ReactNode }) {
  return <span className="text-blue-400">{children}</span>;
}

function Decorator({ children }: { children: React.ReactNode }) {
  return <span className="text-yellow-500">@{children}</span>;
}

function TypeAnnotation({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan-400">{children}</span>;
}

function Punctuation({ children }: { children: React.ReactNode }) {
  return <span className="text-neutral-300">{children}</span>;
}

function NumberValue({ children }: { children: React.ReactNode }) {
  return <span className="text-orange-400">{children}</span>;
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  startLine,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  startLine: number;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="group">
      <div
        className="cursor-pointer hover:bg-neutral-900 transition-colors flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LineNumber num={startLine} />
        <span className="text-neutral-600 mr-2">{isOpen ? "▼" : "▶"}</span>
        <Comment>{title}</Comment>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Skill Bar Component
function SkillBar({ skill, level }: { skill: string; level: number }) {
  return (
    <div className="flex items-center gap-2 ml-12">
      <span className="text-neutral-400 w-24 text-sm">{skill}</span>
      <div className="flex gap-0.5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 ${
              i < level ? "bg-white" : "bg-neutral-800"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

// Main Code Resume Component
export default function CodeResume() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Developer.ts");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  let lineNum = 1;

  return (
    <div className="min-h-screen bg-black text-white font-mono px-4 md:px-8 lg:px-16 xl:px-32 py-6">
      {/* IDE Container */}
      <div className="max-w-6xl mx-auto rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
      {/* IDE Header */}
      <div className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800">
        {/* Window Controls */}
        <div className="flex items-center px-4 py-2 gap-2 border-b border-neutral-800">
          <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-green-500 transition-colors" />
          <span className="ml-4 text-neutral-500 text-sm">
            {developerData.name} — VS Code
          </span>
        </div>

        {/* Tabs */}
        <div className="flex">
          {["Developer.ts", "Skills.ts", "Experience.ts", "Projects.ts"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm border-r border-neutral-800 transition-colors ${
                  activeTab === tab
                    ? "bg-black text-white border-t-2 border-t-white"
                    : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex">
        {/* Line Numbers Gutter Background */}
        <div className="w-12 bg-neutral-950 min-h-[70vh]" />

        {/* Main Content */}
        <div className="flex-1 p-6 pb-24 -ml-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Developer.ts" && (
                <DeveloperTab data={developerData} />
              )}
              {activeTab === "Skills.ts" && (
                <SkillsTab skills={developerData.skills} />
              )}
              {activeTab === "Experience.ts" && (
                <ExperienceTab experience={developerData.experience} />
              )}
              {activeTab === "Projects.ts" && (
                <ProjectsTab projects={developerData.projects} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-1 flex justify-between text-xs text-neutral-500">
        <div className="flex gap-4">
          <span>TypeScript</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div className="flex gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
      </div>

      {/* Download CV Button */}
      <div className="max-w-6xl mx-auto mt-6 flex justify-center">
      <a
        href="/tafadzwacv.pdf"
        download="TafadzwaChitanga.pdf"
        className="bg-white text-black px-6 py-3 font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2 group rounded"
      >
        <span>developer.downloadCV()</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </a>
      </div>
    </div>
  );
}

// Developer Tab Component
function DeveloperTab({ data }: { data: typeof developerData }) {
  let line = 1;

  return (
    <div className="space-y-1 leading-relaxed">
      {/* Imports */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>import</Keyword> <Punctuation>{"{ "}</Punctuation>
        <ClassName>Skills</ClassName><Punctuation>,</Punctuation> <ClassName>Experience</ClassName><Punctuation>,</Punctuation>{" "}
        <ClassName>Projects</ClassName>
        <Punctuation>{" }"}</Punctuation> <Keyword>from</Keyword> <StringValue>./types</StringValue><Punctuation>;</Punctuation>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Decorator */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Decorator>Developer</Decorator>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Decorator>Version("2024.12")</Decorator>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>export class</Keyword> <ClassName>{data.name.replace(" ", "")}</ClassName>{" "}
        <Keyword>extends</Keyword> <ClassName>Human</ClassName>{" "}
        <Keyword>implements</Keyword> <ClassName>IDeveloper</ClassName> {"{"}
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Properties */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Comment>Personal Information</Comment>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>readonly</Keyword> <Property>name</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.name}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>readonly</Keyword> <Property>title</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.title}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>readonly</Keyword> <Property>location</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.location}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Contact */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Comment>Contact Methods</Comment>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>public</Keyword> <Property>email</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.email}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>public</Keyword> <Property>phone</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.phone}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>public</Keyword> <Property>github</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.github}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>public</Keyword> <Property>linkedin</Property><Punctuation>:</Punctuation>{" "}
          <TypeAnnotation>string</TypeAnnotation> <Punctuation>=</Punctuation> <StringValue>{data.linkedin}</StringValue><Punctuation>;</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Constructor */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Method>constructor</Method><Punctuation>()</Punctuation> <Punctuation>{"{"}          </Punctuation></span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>super</Keyword><Punctuation>();</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>this</Keyword><Punctuation>.</Punctuation><Method>initializeSkills</Method><Punctuation>();</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>this</Keyword><Punctuation>.</Punctuation><Method>loadExperience</Method><Punctuation>();</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>this</Keyword><Punctuation>.</Punctuation><Method>buildProjects</Method><Punctuation>();</Punctuation>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">{"}"}</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Methods */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Comment>Core Methods</Comment>
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>public</Keyword> <Method>solve</Method><Punctuation>(</Punctuation>
          <Property>problem</Property><Punctuation>:</Punctuation> <TypeAnnotation>Problem</TypeAnnotation><Punctuation>):</Punctuation>{" "}
          <TypeAnnotation>Solution</TypeAnnotation> <Punctuation>{"{"}          </Punctuation></span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>return</Keyword> <Keyword>this</Keyword>.
          <Method>analyze</Method>(problem)
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-12">
          .<Method>design</Method>()
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-12">
          .<Method>implement</Method>()
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-12">
          .<Method>test</Method>()
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-12">
          .<Method>deploy</Method>();
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">{"}"}</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Keyword>public async</Keyword> <Method>collaborate</Method>(
          <Property>team</Property>: <Keyword>Team</Keyword>):{" "}
          <Keyword>Promise</Keyword>{"<"}<Keyword>Success</Keyword>{">"} {"{"}
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>await</Keyword> <Keyword>this</Keyword>.<Method>communicate</Method>(team);
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-8">
          <Keyword>return</Keyword> <Keyword>this</Keyword>.<Method>deliverValue</Method>();
        </span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">{"}"}</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        {"}"}
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Instance */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Comment>Initialize developer instance</Comment>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>const</Keyword> <Property>developer</Property> ={" "}
        <Keyword>new</Keyword> <ClassName>{data.name.replace(" ", "")}</ClassName>();
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Property>developer</Property>.<Method>isAvailable</Method>() ={" "}
        <Keyword>true</Keyword>; <Comment>Open for opportunities!</Comment>
      </div>
    </div>
  );
}

// Skills Tab Component
function SkillsTab({ skills }: { skills: typeof developerData.skills }) {
  let line = 1;

  const renderSkillArray = (arr: string[], type: string) => {
    return arr.map((skill, idx) => (
      <motion.div
        key={skill}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.05 }}
        className="hover:bg-neutral-900/50 transition-colors"
      >
        <LineNumber num={line++} />
        <span className="ml-8">
          <StringValue>{skill}</StringValue>
          {idx < arr.length - 1 ? "," : ""}
        </span>
      </motion.div>
    ));
  };

  return (
    <div className="space-y-1 leading-relaxed">
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>interface</Keyword> <ClassName>SkillSet</ClassName> {"{"}
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Languages */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Property>languages</Property>: <Keyword>string</Keyword>[] = [
        </span>
      </div>
      {skills.languages.map((skill, idx) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="hover:bg-neutral-900/50 transition-colors"
        >
          <LineNumber num={line++} />
          <span className="ml-8">
            <StringValue>{skill}</StringValue>
            {idx < skills.languages.length - 1 ? "," : ""}
          </span>
        </motion.div>
      ))}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">];</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Frameworks */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Property>frameworks</Property>: <Keyword>string</Keyword>[] = [
        </span>
      </div>
      {skills.frameworks.map((skill, idx) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 + 0.2 }}
          className="hover:bg-neutral-900/50 transition-colors"
        >
          <LineNumber num={line++} />
          <span className="ml-8">
            <StringValue>{skill}</StringValue>
            {idx < skills.frameworks.length - 1 ? "," : ""}
          </span>
        </motion.div>
      ))}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">];</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Tools */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Property>tools</Property>: <Keyword>string</Keyword>[] = [
        </span>
      </div>
      {skills.tools.map((skill, idx) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 + 0.4 }}
          className="hover:bg-neutral-900/50 transition-colors"
        >
          <LineNumber num={line++} />
          <span className="ml-8">
            <StringValue>{skill}</StringValue>
            {idx < skills.tools.length - 1 ? "," : ""}
          </span>
        </motion.div>
      ))}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">];</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {/* Soft Skills */}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">
          <Property>softSkills</Property>: <Keyword>string</Keyword>[] = [
        </span>
      </div>
      {skills.soft.map((skill, idx) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 + 0.6 }}
          className="hover:bg-neutral-900/50 transition-colors"
        >
          <LineNumber num={line++} />
          <span className="ml-8">
            <StringValue>{skill}</StringValue>
            {idx < skills.soft.length - 1 ? "," : ""}
          </span>
        </motion.div>
      ))}
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <span className="ml-4">];</span>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        {"}"}
      </div>
    </div>
  );
}

// Experience Tab Component
function ExperienceTab({
  experience,
}: {
  experience: typeof developerData.experience;
}) {
  let line = 1;

  return (
    <div className="space-y-1 leading-relaxed">
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>type</Keyword> <ClassName>WorkHistory</ClassName> = {"{"}
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {experience.map((exp, expIdx) => (
        <React.Fragment key={exp.company}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: expIdx * 0.2 }}
          >
            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-4">
                <Comment>
                  {exp.duration} | {exp.company}
                </Comment>
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-4">
                <Property>"{exp.company.toLowerCase().replace(/\s/g, "_")}"</Property>: {"{"}
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>role</Property>: <StringValue>{exp.role}</StringValue>,
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>duration</Property>: <StringValue>{exp.duration}</StringValue>,
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>achievements</Property>: [
              </span>
            </div>

            {exp.description.map((desc, descIdx) => (
              <motion.div
                key={descIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: expIdx * 0.2 + descIdx * 0.1 }}
                className="hover:bg-neutral-900/50 transition-colors"
              >
                <LineNumber num={line++} />
                <span className="ml-12">
                  <StringValue>{desc}</StringValue>
                  {descIdx < exp.description.length - 1 ? "," : ""}
                </span>
              </motion.div>
            ))}

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">]</span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-4">
                {"}"}
                {expIdx < experience.length - 1 ? "," : ""}
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
            </div>
          </motion.div>
        </React.Fragment>
      ))}

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        {"}"};
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({
  projects,
}: {
  projects: typeof developerData.projects;
}) {
  let line = 1;

  return (
    <div className="space-y-1 leading-relaxed">
      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>const</Keyword> <Property>projects</Property>:{" "}
        <Keyword>Project</Keyword>[] = [
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      {projects.map((project, projIdx) => (
        <React.Fragment key={project.name}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: projIdx * 0.2 }}
          >
            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-4">{`{`}</span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>name</Property>: <StringValue>{project.name}</StringValue>,
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>description</Property>:{" "}
                <StringValue>{project.description}</StringValue>,
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>technologies</Property>: [
                {project.tech.map((t, i) => (
                  <React.Fragment key={t}>
                    <StringValue>{t}</StringValue>
                    {i < project.tech.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
                ],
              </span>
            </div>

            {project.link && (
              <div className="hover:bg-neutral-900/50 transition-colors">
                <LineNumber num={line++} />
                <span className="ml-8">
                  <Property>url</Property>:{" "}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white underline"
                  >
                    <StringValue>{project.link}</StringValue>
                  </a>
                  ,
                </span>
              </div>
            )}

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-8">
                <Property>status</Property>: <StringValue>deployed</StringValue>
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
              <span className="ml-4">
                {`}`}
                {projIdx < projects.length - 1 ? "," : ""}
              </span>
            </div>

            <div className="hover:bg-neutral-900/50 transition-colors">
              <LineNumber num={line++} />
            </div>
          </motion.div>
        </React.Fragment>
      ))}

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        ];
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Comment>More projects available on GitHub...</Comment>
      </div>

      <div className="hover:bg-neutral-900/50 transition-colors">
        <LineNumber num={line++} />
        <Keyword>export default</Keyword> <Property>projects</Property>;
      </div>
    </div>
  );
}
