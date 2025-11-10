import React, { useState, useRef, useEffect, useCallback, FormEvent, MouseEvent } from 'react';
import { Line, Command } from '../types';
import { WELCOME_MESSAGES, RESUME_LINK } from '../constants';

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
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            setPosition({ x: 0, y: 0 }); // Recenter on resize
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
                    window.open(RESUME_LINK, '_blank');
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

    useEffect(() => {
        const resetTimer = () => {
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
            idleTimerRef.current = setTimeout(() => {
                if (isWelcomeComplete) {
                    setLines(prev => [
                        ...prev,
                        {
                            id: Date.now(),
                            type: 'output',
                            content: <span className="text-gray-500 italic">SYSTEM_MSG: Still there, human?</span>
                        }
                    ]);
                }
            }, 30000); // 30 seconds
        };

        const activityHandler = () => resetTimer();
        window.addEventListener('mousemove', activityHandler);
        window.addEventListener('keydown', activityHandler);
        
        resetTimer();

        return () => {
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
            window.removeEventListener('mousemove', activityHandler);
            window.removeEventListener('keydown', activityHandler);
        };
    }, [isWelcomeComplete]);
    
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
            className={`relative bg-black/70 backdrop-blur-sm border-2 border-green-700/50 shadow-lg shadow-green-500/20 rounded-lg flex flex-col font-mono text-sm md:text-lg text-glow terminal-container transform transition-all duration-300 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            style={{
                width: size.width > 0 ? `${size.width}px` : 'auto',
                height: size.height > 0 ? `${size.height}px` : 'auto',
                visibility: size.width > 0 ? 'visible' : 'hidden',
                transform: `translate(${position.x}px, ${position.y}px)`,
                touchAction: 'none'
            }}
            onClick={() => inputRef.current?.focus()}
        >
            <div 
                className="bg-gray-800/80 p-2 rounded-t-lg flex items-center border-b-2 border-green-700/50 cursor-move"
                onMouseDown={handleDragStart}
            >
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 mr-2 border-2 border-red-900/50"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500 mr-2 border-2 border-yellow-900/50"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-green-900/50"></div>
                <span className="ml-auto text-gray-400 text-xs md:text-base select-none">jay@portfolio</span>
            </div>
            <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto terminal-scrollbar text-sm md:text-base terminal-grid-bg">
                {lines.map(line => (
                    <div key={line.id} className="mb-2">
                         {line.type === 'input' ? (
                             <div className="flex items-center">
                                <span className="text-cyan-400 mr-2">[jay@portfolio]$</span>
                                <span>{line.content}</span>
                             </div>
                         ) : (
                            <div className="whitespace-pre-wrap">{line.content}</div>
                         )
                         }
                    </div>
                ))}
                {!isWelcomeComplete && 
                    <div className="whitespace-pre-wrap">
                        <TypingEffect
                            key={welcomeLinesCount}
                            text={WELCOME_MESSAGES[welcomeLinesCount]}
                            onComplete={onWelcomeComplete}
                            speed={30}
                        />
                    </div>
                }

                 {isWelcomeComplete && (
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <label htmlFor="command-input" className="text-cyan-400 mr-2">[jay@portfolio]$</label>
                        <input
                            ref={inputRef}
                            id="command-input"
                            type="text"
                            className="bg-transparent border-none text-green-400 focus:outline-none w-full text-glow text-sm md:text-base"
                            style={{caretColor: 'transparent'}}
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
                         {isFocused && <span className="bg-green-400 w-2 h-4 md:w-2.5 md:h-5 inline-block animate-pulse -ml-1" />}
                    </form>
                )}
            </div>
            <div className="bg-gray-800/50 p-2 border-t-2 border-green-700/50 rounded-b-lg">
                <Help onCommandClick={handleCommandClick} isOutput={false} />
            </div>
            <div 
                className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
                onMouseDown={handleResizeStart}
            >
                <svg className="w-full h-full text-green-700/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 12v-4h-4m-4-4L4 20M20 4L8 16" />
                </svg>
            </div>
        </div>
    );
};

export default Terminal;