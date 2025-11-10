
import React from 'react';
import { BIO } from '../../constants';
import TypingEffect from '../TypingEffect';

const About: React.FC = () => {
  return (
    <div>
      <TypingEffect text={BIO} />
    </div>
  );
};

export default About;
