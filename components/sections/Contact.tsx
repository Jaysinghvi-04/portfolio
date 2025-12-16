import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="mb-4 text-gray-300">
        Contact channels open. Transmit when ready.
      </div>
      
      <div className="flex">
        {/* MATCHING MATRIX GREEN (text-green-400) */}
        <span className="text-green-400 font-bold w-24">Email:</span>
        <a href="mailto:jaysinghvi54@gmail.com" className="text-gray-300 hover:text-white underline">jaysinghvi54@gmail.com</a>
      </div>
      
      <div className="flex">
        <span className="text-green-400 font-bold w-24">LinkedIn:</span>
        <a href="https://www.linkedin.com/in/jay-singhvi-9498a1339/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">linkedin.com/in/jay-singhvi</a>
      </div>
      
      <div className="flex">
        <span className="text-green-400 font-bold w-24">GitHub:</span>
        <a href="https://github.com/jaysinghvi-04" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">github.com/jaysinghvi-04</a>
      </div>

      <div className="flex">
        <span className="text-green-400 font-bold w-24">TryHackMe:</span>
        <a href="https://tryhackme.com/p/jaysinghvi54" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">tryhackme.com/p/jaysinghvi54</a>
      </div>
    </div>
  );
};

export default Contact;