import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Globe, Github } from 'lucide-react';
import { getAllProjects, type Project } from '@/lib/projects';
import ImageCarousel from '@/components/custom/ImageCarousel';

interface GroupedProjects {
  [year: string]: Project[];
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  const groupedProjects = projects.reduce((acc: GroupedProjects, project) => {
    const year = format(parseISO(project.date), 'yyyy');
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {});

  const years = Object.keys(groupedProjects).sort((a, b) => b.localeCompare(a));

  years.forEach(year => {
    groupedProjects[year].sort((a, b) => 
      parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-32">
        {years.map(year => (
          <div key={year}>
            <h2 className="text-sm font-medium text-muted-foreground mb-16">
              {year}
            </h2>

            <div className="space-y-32">
              {groupedProjects[year].map((project, index) => (
                <div key={index} className="group">
                  <ImageCarousel 
                    images={project.image.split(',').map(img => img.trim())} 
                    title={project.title}
                  />
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-l font-medium group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <time className="text-xs text-muted-foreground">
                        {format(parseISO(project.date), 'MMM dd')}
                      </time>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/60">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="hover:text-muted-foreground transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 text-xs">
                      <Link 
                        href={project.projectUrl} 
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        Live
                      </Link>
                      <Link 
                        href={project.githubUrl} 
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="mr-2 h-3 w-3" />
                        Code
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}