
import React from 'react';
import { PROJECTS } from '../../constants';

const Projects: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      {PROJECTS.map((project, index) => (
        <div key={index}>
          <div className="flex justify-between items-baseline">
            <h3 className="text-kali-blue font-bold">{project.title}</h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kali-green hover:underline text-sm flex-shrink-0 ml-4"
              >
                [view source]
              </a>
            )}
          </div>
          <p className="text-kali-white">{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
