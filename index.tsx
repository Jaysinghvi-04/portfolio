
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<a 
  href="/CV.pdf" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-500 hover:underline" // specific for Tailwind CSS which you are using
>
  Download Resume
</a>