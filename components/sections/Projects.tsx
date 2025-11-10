
import React from 'react';
import { PROJECTS } from '../../constants';

const Projects: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      {PROJECTS.map((project, index) => (
        <div key={index}>
          <div className="flex justify-between items-baseline">
            <h3 className="text-cyan-400 font-bold">{project.title}</h3>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline text-sm"
            >
              [view source]
            </a>
          </div>
          <p className="text-gray-300">{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
