import React from 'react';
import Terminal from './components/Terminal';
import MatrixBackground from './components/MatrixBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-kali-black text-kali-white terminal-grid-bg">
      <MatrixBackground />
      <div className="relative z-20 w-full h-full">
        <Terminal />
      </div>
    </div>
  );
};

export default App;