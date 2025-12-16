import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        {/* MATCHING MATRIX GREEN (text-green-400) */}
        <div className="text-green-400 font-bold mb-1">Cloud Misconfiguration Scanner</div>
        <div className="text-gray-300">
          Developed a Python-based tool to detect common security misconfigurations in cloud environments. Automated the auditing process for S3 buckets and IAM policies to identify public access risks and implemented reporting functionality to generate actionable security recommendations.
        </div>
      </div>

      <div>
        <div className="text-green-400 font-bold mb-1">Network Port Scanner</div>
        <div className="text-gray-300">
          Created a multi-threaded port scanner using Python's socket library to identify open ports and services. Optimized scanning speed and implemented banner grabbing for OS detection.
        </div>
      </div>

      <div>
        <div className="text-green-400 font-bold mb-1">PROJO – Project Management Tool</div>
        <div className="text-gray-300">
          Built a collaborative project management platform with secure user authentication. Implemented role-based access control (RBAC) to ensure data privacy between team members.
        </div>
      </div>

      <div>
        <div className="text-green-400 font-bold mb-1">Inventory Management System</div>
        <div className="text-gray-300">
          Designed and developed a web application for efficient inventory management. Built both frontend and backend architectures to manage the relationship between the user interface and the SQL database.
        </div>
      </div>
    </div>
  );
};

export default Projects;