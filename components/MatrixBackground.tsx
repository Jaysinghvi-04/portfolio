
import React, { useRef, useEffect } from 'react';

const MatrixBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            // Re-initialize columns on resize
            columns = Array(Math.floor(w / 20) + 1).fill(h);
        };

        window.addEventListener('resize', handleResize);

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split('');
        
        let columns = Array(Math.floor(w / 20) + 1).fill(h);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#50fa7b'; // kali-green
            ctx.font = '15pt monospace';

            columns.forEach((y, i) => {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                const x = i * 20;
                ctx.fillText(text, x, y);

                if (y > 758 + Math.random() * 10000) {
                    columns[i] = 0;
                } else {
                    columns[i] = y + 20;
                }
            });
        };

        const intervalId = setInterval(draw, 40);
        
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 blur-sm" />;
};

export default MatrixBackground;