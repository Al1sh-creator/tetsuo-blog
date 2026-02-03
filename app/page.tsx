'use client';

import { AnimatedBackground } from '@/components/animated-background';
import { AnimatedDivider } from '@/components/animated-divider';
import { AnimatedPostCard } from '@/components/animated-post-card';
import { AnimatedProjectCard } from '@/components/animated-project-card';
import { CanvasScene } from '@/components/canvas-scene';
import { FloatingOrbs } from '@/components/floating-orbs';
import { GlitchText } from '@/components/glitch-text';
import { HexagonMatrix } from '@/components/hexagon-matrix';
import { MouseTracker } from '@/components/mouse-tracker';
import { NavLink } from '@/components/nav-link';
import { PageLoader } from '@/components/page-loader';
import { ParallaxLayers } from '@/components/parallax-layers';
import { ScrollProgress } from '@/components/scroll-progress';
import { TechCard } from '@/components/tech-card';
import { useParallax } from '@/hooks/use-parallax';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Link from 'next/link';
import { useState } from 'react';
import { VideoBackground } from '@/components/video-background'; // Import VideoBackground component

export default function Home() {
  const postsSection = useScrollAnimation();
  const projectsSection = useScrollAnimation();
  const contactSection = useScrollAnimation();
  const parallaxRef = useParallax(0.3);
  const [hoveredPost, setHoveredPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: 'Neural Networks & Consciousness',
      excerpt:
        'Exploring the intersection of artificial intelligence and human cognition in the digital age.',
      date: '2024.02.15',
      category: 'AI',
      readTime: '8 min',
    },
    {
      id: 2,
      title: 'Cyberpunk Architecture',
      excerpt:
        'Design patterns in distributed systems and the future of decentralized computing.',
      date: '2024.02.08',
      category: 'TECH',
      readTime: '12 min',
    },
    {
      id: 3,
      title: 'Digital Dystopia',
      excerpt:
        'Society, technology, and the thin line between progress and destruction.',
      date: '2024.01.28',
      category: 'PHILOSOPHY',
      readTime: '15 min',
    },
  ];

  const projects = [
    {
      name: 'Psychic Interface',
      description: 'Neural link simulation platform',
    },
    {
      name: 'Data Encryption',
      description: 'Quantum-resistant cryptography',
    },
    {
      name: 'System Override',
      description: 'Security research toolkit',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen font-mono relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Page Loader */}
      <PageLoader />

      {/* Parallax Background Layers */}
      <ParallaxLayers />

      {/* Animated Video Background */}
      <VideoBackground />

      {/* Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-48 bg-card border-r-2 border-border p-8 overflow-y-auto hidden md:flex flex-col z-20">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-primary mb-2">TETSUO</h1>
          <p className="text-xs text-muted-foreground">PSYCHIC WARRIOR</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-bold text-accent mb-3 tracking-widest">
              NAVIGATION
            </h2>
            <ul className="space-y-2">
              <li>
                <NavLink href="#home" label="/ Home" />
              </li>
              <li>
                <NavLink href="#posts" label="/ Archive" />
              </li>
              <li>
                <NavLink href="#projects" label="/ Projects" />
              </li>
              <li>
                <NavLink href="#contact" label="/ Contact" />
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold text-accent mb-3 tracking-widest">
              CONNECT
            </h2>
            <div className="flex gap-3">
              <a
                href="#twitter"
                className="text-sm hover:text-secondary transition-colors duration-200"
              >
                X
              </a>
              <a
                href="#github"
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                GH
              </a>
              <a
                href="#email"
                className="text-sm hover:text-accent transition-colors duration-200"
              >
                EMAIL
              </a>
            </div>
          </div>

          {/* Decorative pattern */}
          <div className="mt-auto pt-8 border-t border-border">
            <div className="space-y-1">
              <div className="h-1 w-full bg-linear-to-r from-secondary via-primary to-accent opacity-50" />
              <div className="h-px w-3/4 bg-border" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-48 relative z-10">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen bg-linear-to-b from-background via-background to-card flex items-center justify-center px-4 md:px-8 lg:px-16 relative overflow-hidden"
        >
          {/* Animated 3D Background */}
          <AnimatedBackground />

          <div className="relative z-10 max-w-3xl w-full">
            <div className="mb-8">
              <span className="text-primary text-xs font-bold tracking-widest">
                &gt; ENTERING SYSTEM
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 text-balance leading-tight">
              <GlitchText className="block">TETSUO</GlitchText>
              <span className="text-accent">PSYCHIC</span>
              <br />
              <span className="text-white">WRITINGS</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Exploring the intersection of technology, consciousness, and digital dystopia.
              Raw thoughts on AI, systems, and the future of humanity.
            </p>

            {/* 3D Canvas Scene */}
            <div className="my-12 rounded-sm border border-border overflow-hidden">
              <CanvasScene type="torus" />
            </div>

            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 transform hover:scale-105">
                READ POSTS
              </button>
              <button className="px-6 py-3 border-2 border-secondary text-secondary font-bold text-sm hover:bg-secondary/10 transition-all duration-200">
                VIEW PROJECTS
              </button>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section id="posts" className="px-4 md:px-8 lg:px-16 py-20 md:py-32">
          <div className="mb-16">
            <span className="text-xs text-accent font-bold tracking-widest">
              ARCHIVE
            </span>
            <h2 className="text-4xl font-black mt-4 mb-2">NEURAL LOGS</h2>
            <div className="h-1 w-20 bg-linear-to-r from-secondary to-accent" />
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <AnimatedPostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
                index={index}
                isVisible={postsSection.isVisible}
              />
            ))}
          </div>
        </section>

        {/* Animated Divider */}
        <AnimatedDivider />

        {/* Projects Section */}
        <section
          ref={projectsSection.ref}
          id="projects"
          className="px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-card relative"
        >
          {/* Hexagon Matrix Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none h-96 top-0">
            <HexagonMatrix />
          </div>

          <div className="mb-16 relative z-10">
            <span className="text-xs text-secondary font-bold tracking-widest">
              SYSTEMS
            </span>
            <h2 className="text-4xl font-black mt-4 mb-2">ACTIVE PROJECTS</h2>
            <div className="h-1 w-20 bg-linear-to-r from-accent to-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {projects.map((project, idx) => (
              <AnimatedProjectCard
                key={idx}
                name={project.name}
                description={project.description}
                index={idx}
                isVisible={projectsSection.isVisible}
              />
            ))}
          </div>
        </section>

        {/* Animated Divider */}
        <AnimatedDivider />

        {/* Tech Stack Section */}
        <section className="px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-linear-to-b from-card to-background relative">
          <div className="mb-16">
            <span className="text-xs text-accent font-bold tracking-widest">CAPABILITIES</span>
            <h2 className="text-4xl font-black mt-4 mb-2">TECH ARSENAL</h2>
            <div className="h-1 w-20 bg-linear-to-r from-primary to-secondary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechCard
              title="Neural Interfaces"
              description="Advanced AI systems and machine learning models for cognitive processing."
              index={0}
            />
            <TechCard
              title="Data Synthesis"
              description="Real-time data streaming and visualization across distributed networks."
              index={1}
            />
            <TechCard
              title="Quantum Logic"
              description="Complex algorithmic computation and probability-based problem solving."
              index={2}
            />
            <TechCard
              title="Holographic UI"
              description="3D interactive interfaces and immersive user experiences."
              index={3}
            />
            <TechCard
              title="Cyber Security"
              description="Advanced encryption and network protection protocols."
              index={4}
            />
            <TechCard
              title="System Integration"
              description="Seamless integration across multiple platforms and architectures."
              index={5}
            />
          </div>
        </section>

        {/* Animated Divider */}
        <AnimatedDivider />

        {/* Contact Section */}
        <MouseTracker className="relative">
          <section ref={contactSection.ref} id="contact" className="px-4 md:px-8 lg:px-16 py-20 md:py-32 relative">
            <div className={`mb-16 transition-all duration-500 ${
              contactSection.isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }`}>
              <span className="text-xs text-primary font-bold tracking-widest">
                TRANSMISSION
              </span>
              <h2 className="text-4xl font-black mt-4 mb-2">GET IN TOUCH</h2>
              <div className="h-1 w-20 bg-linear-to-r from-primary to-accent" />
            </div>

            <div className={`max-w-2xl transition-all duration-700 ${
              contactSection.isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }`}>
              <p className="text-muted-foreground mb-8">
                Send a transmission across the network. I respond to all messages
                within 48 hours.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    SENDER
                  </label>
                  <input
                    type="text"
                    className="w-full bg-card border border-border p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-accent mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full bg-card border border-border p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-card border border-border p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-secondary transition-colors duration-200 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-primary to-accent text-background font-bold py-3 hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 transform hover:scale-105"
                >
                  SEND TRANSMISSION
                </button>
              </form>
            </div>
          </section>
        </MouseTracker>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-4 md:px-8 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-sm text-muted-foreground">
                © 2024 TETSUO PSYCHIC NETWORK
              </p>
              <p className="text-xs text-muted-foreground/50 mt-1">
                Build. Create. Transcend.
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
