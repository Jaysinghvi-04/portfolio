import React from 'react';

const Skills: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        {/* MATCHING MATRIX GREEN (text-green-400) */}
        <div className="text-green-400 font-bold mb-1">Operating Systems</div>
        <div className="text-gray-300">
          Red Hat Enterprise Linux (RHEL) &nbsp; Kali Linux &nbsp; Ubuntu
        </div>
      </div>

      <div>
        <div className="text-green-400 font-bold mb-1">Programming</div>
        <div className="text-gray-300">
          Python &nbsp; Bash Scripting &nbsp; SQL &nbsp; .NET Framework
        </div>
      </div>

      <div>
        <div className="text-green-400 font-bold mb-1">Networking & Cloud</div>
        <div className="text-gray-300">
          TCP/IP &nbsp; OSI Model &nbsp; DNS &nbsp; DHCP &nbsp; SSH
        </div>
      </div>

      <div>
        <div className="text-green-400 font-bold mb-1">Creative & Design</div>
        <div className="text-gray-300">
          Designing &nbsp; Video Editing &nbsp; Blender (3D Modeling)
        </div>
      </div>
    </div>
  );
};

export default Skills;