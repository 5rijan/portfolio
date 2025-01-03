import React from 'react';
import Link from 'next/link';
import { ExternalLink, BookOpen, Music } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-2xl space-y-24">
      {/* Introduction & About */}
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm italic text-muted-foreground">Hey, I'm</p>
          <h1 className="text-base font-semibold">Srijan Chaudhary</h1>
          <p className="text-sm text-muted-foreground">Student / Researcher at University of Sydney</p>
        </div>

        <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        I’m a student, software engineer, and researcher passionate about creating tools that make everyday life a little better. 
        Originally from Jaipur, India, I’m currently pursuing a Bachelor’s degree in Intelligent Information Systems at the University of Sydney, 
        where I’m specializing in the programming aspects of cognitive sciences and human-computer interaction.
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Currently, I’m focused on exploring the fascinating intersection of artificial intelligence and human-computer interaction. 
        My research aims to make technology more intuitive and accessible to everyone.
      </p>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        I'm an INTJ personality type. 
        When I'm not coding or researching, you'll find me writing about technology, working on side projects, or contributing to open-source communities.
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed">
        While I’m still in the early stages of my academic and professional journey, you can check out some of my <a href="/projects" className="text-primary underline">projects</a> on
        my <a href="https://github.com/5rijan" className="text-primary underline">GitHub</a>. These reflect my commitment to learning and building impactful tools.
      </p>
    </div>
      </section>

      {/* Experience */}
      <section className="space-y-12">
        <h2 className="text-sm font-medium">Experience</h2>
        
        <div className="space-y-12">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm">Research Project Assistant</h3>
              <span className="text-xs text-muted-foreground">2024 — Now</span>
            </div>
            <p className="text-xs text-muted-foreground">The University of Sydney • Sydney, Australia</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm">Programming and Math Coach</h3>
              <span className="text-xs text-muted-foreground">2024 — 2024</span>
            </div>
            <p className="text-xs text-muted-foreground">Skill Samurai • Sydney, Australia</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm">Customer Service Lead</h3>
              <span className="text-xs text-muted-foreground">2022 — 2023</span>
            </div>
            <p className="text-xs text-muted-foreground">Titan Store • Jaipur, India</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm">Student Researcher</h3>
              <span className="text-xs text-muted-foreground">2020 — 2021</span>
            </div>
            <p className="text-xs text-muted-foreground">The New York Academy of Sciences • New York, USA</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm">Summer School Researcher</h3>
              <span className="text-xs text-muted-foreground">2021 — 2021</span>
            </div>
            <p className="text-xs text-muted-foreground">Indian Institute of Remote Sensing, ISRO</p>
          </div>

          <Link 
            href="https://read.cv/5rijan" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View full résumé
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-8">
        <h2 className="text-sm font-medium">Skills</h2>
        
        <div className="flex flex-wrap gap-y-8">
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="text-xs text-muted-foreground">Languages</h3>
            <p className="text-sm">Python, JavaScript, Java, TypeScript</p>
          </div>
          
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="text-xs text-muted-foreground">Frontend</h3>
            <p className="text-sm">React, Next.js, Tailwind CSS</p>
          </div>
          
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="text-xs text-muted-foreground">Backend</h3>
            <p className="text-sm">Flask, Django, Postgresql, Sqlite</p>
          </div>
          
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="text-xs text-muted-foreground">Tools</h3>
            <p className="text-sm">Git, Docker</p>
          </div>
          
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="text-xs text-muted-foreground">Currently Learning</h3>
            <p className="text-sm">C Programming</p>
          </div>
        </div>
      </section>

      {/* Currently */}
      <section className="space-y-8">
        <h2 className="text-sm font-medium">Currently</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <Link 
                href="https://www.penguin.co.uk/books/62240/moby-dick-by-herman-melville-intro-andrew-delbanco-notes-tom-quirk-commentary-tom-quirk/9780142437247" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-foreground transition-colors group"
              >
                Moby-Dick by Herman Melville
                <ExternalLink className="ml-1 h-3 w-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Music className="h-4 w-4 text-muted-foreground" />
              <Link 
                href="https://open.spotify.com/track/03kZca43rgVgphYctcopJU?si=18798996d70e40c4" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-foreground transition-colors group"
              >
                Breathe In - Frou Frow
                <ExternalLink className="ml-1 h-3 w-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}