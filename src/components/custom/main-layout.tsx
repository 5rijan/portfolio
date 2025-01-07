"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Function to format pathname to only show first level
  const formatPathname = (path: string) => {
    if (path === '/') return '/home';
    const parts = path.split('/');
    return parts.length > 2 ? `/${parts[1]}/..` : path;
  };

  const menuItems = [
    { path: '/', label: 'home' },
    { path: '/about', label: 'about' },
    { path: '/projects', label: 'projects' },
    { path: '/writings', label: 'writings' },
    { path: '/art', label: 'art & photos' },
    { path: '/contact', label: 'contact' },

  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 flex justify-between items-center">
        <Link href="/" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
          chsrijan.com{formatPathname(pathname)}
        </Link>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full hover:bg-transparent p-0 w-6 h-6 flex items-center justify-center"
          >
            <Plus 
              className={`h-4 w-4 transition-all duration-200 ease-in-out hover:text-foreground text-muted-foreground
                ${isMenuOpen ? 'rotate-45' : 'rotate-0'}`}
            />
          </Button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 py-1 w-32 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-sm z-50"
                >
                <div className="py-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-3 py-1.5 text-sm text-muted-foreground/80 hover:text-foreground transition-colors
                        ${pathname === item.path ? 'text-foreground' : ''}
                        ${item.path === pathname ? 'font-medium' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="space-y-8">
          {children}
        </div>
      </main>

      <footer className="py-6 flex justify-between items-center">
        <Link href="/" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
        सृजन.चौधरी
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full hover:bg-transparent p-0 w-6 h-6 flex items-center justify-center"
            onClick={() => window.location.href = 'mailto:srijanchaudhary2003@gmail.com'}
          >
            <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;