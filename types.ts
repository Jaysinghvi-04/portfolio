
import React from 'react';

export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface Skill {
  category: string;
  technologies: string[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  tryhackme: string;
}

export type Command = 'help' | 'about' | 'skills' | 'projects' | 'contact' | 'resume' | 'clear';

export interface Line {
  id: number;
  type: 'input' | 'output';
  content: string | React.ReactNode;
  command?: Command;
}
