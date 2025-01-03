import React from 'react';

export default function Home() {
  return (
    <div className="space-y-8 mt-16">
      <div className="space-y-2">
        <p className="text-sm italic text-muted-foreground">
          The internet corner of
        </p>
        <h1 className="text-base font-semibold">
          Srijan Chaudhary
        </h1>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed w-5/6 text-left">
        Welcome to my digital garden—a place where I explore <a href="/writings" className="text-primary underline">ideas</a>, share <a href="/projects" className="text-primary underline">projects</a>, <a href="/art" className="text-primary underline">art</a> and document my journey as a student, 
        developer, and researcher. I'm fascinated by the intersection of technology, design, and human interaction, and 
        this space is a reflection of my curiosity and creativity.
      </p>
    </div>
  );
}