import React from 'react';
import Terminal from './components/Terminal';
import MatrixBackground from './components/MatrixBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-green-400 overflow-hidden">
      <MatrixBackground />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <Terminal />
      </div>
    </div>
  );
};

export default App;