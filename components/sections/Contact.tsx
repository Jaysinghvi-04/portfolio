
import React from 'react';
import { CONTACT_INFO } from '../../constants';

const Contact: React.FC = () => {
  return (
    <div className="w-full">
        <p className="mb-2">Contact channels open. Transmit when ready.</p>
        <ul>
            <li>
                <span className="text-cyan-400 w-20 inline-block">Email:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">{CONTACT_INFO.email}</a>
            </li>
            <li>
                <span className="text-cyan-400 w-20 inline-block">LinkedIn:</span>
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{CONTACT_INFO.linkedin}</a>
            </li>
            <li>
                <span className="text-cyan-400 w-20 inline-block">GitHub:</span>
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{CONTACT_INFO.github}</a>
            </li>
        </ul>
    </div>
  );
};

export default Contact;
