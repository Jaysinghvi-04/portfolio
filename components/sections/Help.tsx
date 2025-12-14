
import React from 'react';
import { Command } from '../../types';

interface HelpProps {
  onCommandClick: (command: Command) => void;
  isOutput: boolean;
}

const commands: { cmd: Command, desc: string }[] = [
    { cmd: 'about', desc: 'Display my professional bio' },
    { cmd: 'skills', desc: 'List my technical skills' },
    { cmd: 'projects', desc: 'Showcase my recent work' },
    { cmd: 'contact', desc: 'Show contact information' },
    { cmd: 'resume', desc: 'Open my resume in a new tab' },
    { cmd: 'clear', desc: 'Clear the terminal screen' },
];

const Help: React.FC<HelpProps> = ({ onCommandClick, isOutput }) => {
    if (isOutput) {
        return (
            <div className="w-full">
                <p className="mb-2 text-kali-green">Available commands:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {commands.map(({ cmd, desc }) => (
                        <li key={cmd} className="flex items-start">
                            <span className="text-kali-blue w-20 inline-block flex-shrink-0">{cmd}</span>
                            <span className="text-kali-white">- {desc}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="w-full">
            <p className="text-kali-gray text-xs mb-1">Click a command to execute it, or use Tab to autocomplete.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                 {commands.map(({ cmd }) => (
                    <button
                        key={cmd}
                        onClick={() => onCommandClick(cmd)}
                        className="text-kali-cyan hover:underline hover:text-kali-blue transition-colors duration-200 text-xs sm:text-sm"
                    >
                        {cmd}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Help;