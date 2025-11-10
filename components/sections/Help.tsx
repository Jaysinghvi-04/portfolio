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
                <p className="mb-2">Available commands:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                    {commands.map(({ cmd, desc }) => (
                        <li key={cmd} className="flex items-center">
                            <span className="text-cyan-400 w-24 inline-block">{cmd}</span>
                            <span className="text-gray-400">- {desc}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="w-full">
            <p className="text-gray-400 text-xs mb-1">Click a command to execute it, or use Tab to autocomplete.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                 {commands.map(({ cmd }) => (
                    <button
                        key={cmd}
                        onClick={() => onCommandClick(cmd)}
                        className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm"
                    >
                        {cmd}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Help;