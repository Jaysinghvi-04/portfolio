



import React from 'react';
import { CONTACT_INFO } from '../../constants';

const Contact: React.FC = () => {
  return (
    <div className="w-full">
        <p className="mb-2 text-kali-green">Contact channels open. Transmit when ready.</p>
        <ul>
            <li className="flex items-start">
                <span className="text-kali-blue w-28 inline-block flex-shrink-0">Email:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline break-all text-kali-white">{CONTACT_INFO.email}</a>
            </li>
            <li className="flex items-start">
                <span className="text-kali-blue w-28 inline-block flex-shrink-0">LinkedIn:</span>
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline break-all text-kali-white">{CONTACT_INFO.linkedin}</a>
            </li>
            <li className="flex items-start">
                <span className="text-kali-blue w-28 inline-block flex-shrink-0">GitHub:</span>
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline break-all text-kali-white">{CONTACT_INFO.github}</a>
            </li>
            <li className="flex items-start">
                <span className="text-kali-blue w-28 inline-block flex-shrink-0">TryHackMe:</span>
                <a href={CONTACT_INFO.tryhackme} target="_blank" rel="noopener noreferrer" className="hover:underline break-all text-kali-white">{CONTACT_INFO.tryhackme}</a>
            </li>
        </ul>
    </div>
  );
};

export default Contact;
