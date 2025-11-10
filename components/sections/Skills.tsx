
import React from 'react';
import { SKILLS } from '../../constants';

const Skills: React.FC = () => {
  return (
    <div className="w-full">
      {SKILLS.map((skill, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-cyan-400 font-bold mb-1">{skill.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.technologies.map((tech, i) => (
              <span key={i} className="bg-gray-800 px-2 py-1 text-sm rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
