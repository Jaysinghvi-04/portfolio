
import React from 'react';
import { SKILLS } from '../../constants';

const Skills: React.FC = () => {
  return (
    <div className="w-full">
      {SKILLS.map((skill, index) => (
        <div key={index} className="mb-3">
          <h3 className="text-kali-blue font-bold mb-1">{skill.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.technologies.map((tech, i) => (
              <span key={i} className="bg-kali-gray px-2 py-1 text-sm rounded-sm text-kali-green">
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
