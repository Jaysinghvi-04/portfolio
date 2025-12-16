import React, { useState, useRef, useEffect, useCallback, FormEvent, MouseEvent } from 'react';
import { Line, Command } from '../types';
import { WELCOME_MESSAGES } from '../constants'; 

import Help from './sections/Help';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import TypingEffect from './TypingEffect';

const Terminal: React.FC = () => {
    const [lines, setLines] = useState<Line[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [isFocused, setIsFocused] = useState<boolean>(true);
    
    const [welcomeLinesCount, setWelcomeLinesCount] = useState(0);
    const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
    
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // State for window management
    const [isLoaded, setIsLoaded] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 0, height: 0 });
    const dragStartRef = useRef<{ x: number, y: number, pos: {x: number, y: number} } | null>(null);
    const resizeStartRef = useRef<{ x: number, y: number, size: {width: number, height: number} } | null>(null);

    const scrollToBottom = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const updateLayout = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const newWidth = Math.min(900, vw - 40);
            const newHeight = Math.min(600, vh - 40);
            setSize({ width: newWidth, height: newHeight });
            setPosition({ x: (vw - newWidth) / 2, y: (vh - newHeight) / 2 });
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [lines, scrollToBottom, welcomeLinesCount]);
    
    useEffect(() => {
        if(isWelcomeComplete) {
            inputRef.current?.focus();
        }
    }, [isWelcomeComplete]);

    const executeCommand = useCallback((commandStr: string) => {
        const command = commandStr.trim().toLowerCase() as Command;
        if (!command) return;

        const getCommandOutput = (cmd: Command): React.ReactNode => {
            switch (cmd) {
                case 'help':
                    return <Help onCommandClick={handleCommandClick} isOutput={true} />;
                case 'about':
                    return <About />;
                case 'skills':
                    return <Skills />;
                case 'projects':
                    return <Projects />;
                case 'contact':
                    return <Contact />;
                case 'resume':
                    window.open('/CV.pdf', '_blank');
                    return "Opening resume in new tab...";
                case 'clear':
                    setLines([]);
                    return null;
                default:
                    return `Command not found: ${commandStr}. Type 'help' for a list of commands.`;
            }
        };
        
        const outputContent = getCommandOutput(command);

        const newLines: Line[] = [
            { id: Date.now(), type: 'input', content: commandStr, command },
        ];
        if (outputContent !== null) {
            newLines.push({ id: Date.now() + 1, type: 'output', content: outputContent });
        }

        setLines(prev => [...prev, ...newLines]);

        if (command !== 'clear') {
            setCommandHistory(prev => [commandStr, ...prev]);
        }
        setHistoryIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        executeCommand(inputValue);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(newIndex);
                setInputValue(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > -1) {
                const newIndex = Math.max(historyIndex - 1, -1);
                setHistoryIndex(newIndex);
                setInputValue(newIndex === -1 ? '' : commandHistory[newIndex]);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const commands: Command[] = ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'clear'];
            const matchingCommand = commands.find(c => c.startsWith(inputValue.toLowerCase()));
            if (matchingCommand) {
                setInputValue(matchingCommand);
            }
        }
    };
    
    const handleCommandClick = (command: Command) => {
        executeCommand(command);
    };
    
    const onWelcomeComplete = () => {
        setLines(prev => [...prev, {id: welcomeLinesCount, type: 'output', content: WELCOME_MESSAGES[welcomeLinesCount]}]);
        const nextCount = welcomeLinesCount + 1;
        if (nextCount >= WELCOME_MESSAGES.length) {
            setIsWelcomeComplete(true);
        } else {
            setWelcomeLinesCount(nextCount);
        }
    };

    // Drag and Resize handlers
    const handleDragStart = (e: MouseEvent<HTMLDivElement>) => {
        dragStartRef.current = { x: e.clientX, y: e.clientY, pos: position };
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
    };

    const handleDragMove = (e: globalThis.MouseEvent) => {
        if (!dragStartRef.current) return;
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        setPosition({
            x: dragStartRef.current.pos.x + dx,
            y: dragStartRef.current.pos.y + dy,
        });
    };

    const handleDragEnd = () => {
        dragStartRef.current = null;
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
    };

    const handleResizeStart = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        resizeStartRef.current = { x: e.clientX, y: e.clientY, size: size };
        window.addEventListener('mousemove', handleResizeMove);
        window.addEventListener('mouseup', handleResizeEnd);
    };

    const handleResizeMove = (e: globalThis.MouseEvent) => {
        if (!resizeStartRef.current) return;
        const dx = e.clientX - resizeStartRef.current.x;
        const dy = e.clientY - resizeStartRef.current.y;
        
        const newWidth = resizeStartRef.current.size.width + dx;
        const newHeight = resizeStartRef.current.size.height + dy;

        setSize({
            width: Math.min(Math.max(320, newWidth), window.innerWidth - 20),
            height: Math.min(Math.max(300, newHeight), window.innerHeight - 20),
        });
    };
    
    const handleResizeEnd = () => {
        resizeStartRef.current = null;
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
    };
    
    return (
        <div 
            className={`terminal-container absolute bg-kali-black/90 backdrop-blur-md border-2 border-kali-gray shadow-lg shadow-black/50 rounded-lg flex flex-col font-mono text-sm md:text-base text-gray-300 transform transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
                width: size.width > 0 ? `${size.width}px` : 'auto',
                height: size.height > 0 ? `${size.height}px` : 'auto',
                top: `${position.y}px`,
                left: `${position.x}px`,
                visibility: size.width > 0 ? 'visible' : 'hidden',
                touchAction: 'none'
            }}
            onClick={() => inputRef.current?.focus()}
        >
            <div 
                className="bg-kali-gray p-2 rounded-t-lg flex items-center border-b-2 border-kali-gray cursor-move"
                onMouseDown={handleDragStart}
            >
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-kali-red mr-2"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-kali-yellow mr-2"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-kali-green"></div>
                <span className="ml-auto text-gray-400 text-xs md:text-base select-none">root@jay:~</span>
            </div>
            <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto terminal-scrollbar text-sm md:text-base">
                {lines.map(line => (
                    <div key={line.id} className="mb-2">
                         {line.type === 'input' ? (
                             <div className="flex items-center flex-wrap">
                                {/* Prompt */}
                                <span className="text-blue-500 font-bold">root@jay</span>
                                <span className="text-white mx-0.5">:</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-red-500 mr-2">#</span>
                                {/* Input Text */}
                                <span className="text-gray-200">{line.content}</span>
                             </div>
                         ) : (
                            // UPDATED: Changed to gray-300 (Silver) for better readability
                            <div className="whitespace-pre-wrap text-gray-300">{line.content}</div>
                         )
                         }
                    </div>
                ))}
                {!isWelcomeComplete && 
                    // UPDATED: Typing effect text also changed to gray-300
                    <div className="whitespace-pre-wrap text-gray-300">
                        <TypingEffect
                            key={welcomeLinesCount}
                            text={WELCOME_MESSAGES[welcomeLinesCount]}
                            onComplete={onWelcomeComplete}
                            speed={30}
                        />
                    </div>
                }

                 {isWelcomeComplete && (
                    <form onSubmit={handleSubmit} className="flex items-center flex-wrap">
                        <div className="flex items-center mr-2">
                            <span className="text-blue-500 font-bold">root@jay</span>
                            <span className="text-white mx-0.5">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-red-500">#</span>
                        </div>
                        <input
                            ref={inputRef}
                            id="command-input"
                            type="text"
                            className="bg-transparent border-none text-gray-200 focus:outline-none flex-1 min-w-[50px] text-sm md:text-base"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                         {isFocused && <span className="bg-gray-200 w-2 h-4 md:w-2.5 md:h-5 inline-block animate-pulse ml-0.5" />}
                    </form>
                )}
            </div>
            <div className="bg-kali-gray p-2 border-t-2 border-kali-gray rounded-b-lg">
                <Help onCommandClick={handleCommandClick} isOutput={false} />
            </div>
            <div 
                className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
                onMouseDown={handleResizeStart}
            >
                <svg className="w-full h-full text-kali-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 12v-4h-4m-4-4L4 20M20 4L8 16" />
                </svg>
            </div>
        </div>
    );
};

export default Terminal;