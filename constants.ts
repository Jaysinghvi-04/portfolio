import { Project, Skill } from './types';

export const YOUR_NAME = "Jay Singhvi";
export const YOUR_PROFESSION = "Cybersecurity Analyst & Penetration Tester";
export const RESUME_LINK = "#"; // Replace with your actual resume link or file path

export const WELCOME_MESSAGES: string[] = [
    'Initializing secure shell...',
    'Bypassing firewall... Connection established.',
    `Accessing mainframe of ${YOUR_NAME}.`,
    `Designation: ${YOUR_PROFESSION}.`,
    `Type 'help' for a list of available exploits (commands).`
];

export const BIO = `Greetings. I am ${YOUR_NAME}, a ${YOUR_PROFESSION} specializing in offensive security. My primary function involves simulating real-world cyber attacks to identify and mitigate vulnerabilities before they can be exploited by malicious actors. I have hands-on experience with network reconnaissance, vulnerability scanning, and executing exploits in controlled environments, aiming to enhance organizational security posture through rigorous ethical hacking.`;

export const PROJECTS: Project[] = [
  {
    title: "Cloud Misconfiguration Scanner",
    description: "Developed a Python-based tool to detect common security misconfigurations in cloud environments. Automated the auditing process for S3 buckets and IAM policies to identify public access risks and implemented reporting functionality to generate actionable security recommendations.",
    link: ""
  },
  {
    title: "Network Port Scanner",
    description: "Created a multi-threaded port scanner using Python’s socket library to identify open ports and services. Optimized scanning speed and implemented banner grabbing for OS detection.",
    link: ""
  },
  {
    title: "PROJO - Project Management Tool",
    description: "Built a collaborative project management platform with secure user authentication. Implemented role-based access control (RBAC) to ensure data privacy between team members.",
    link: ""
  },
  {
    title: "Inventory Management System",
    description: "Designed and developed a web application for efficient inventory management. Built both frontend and backend architectures to manage the relationship between the user interface and the SQL database.",
    link: ""
  },
  {
    title: "Model of Mustang",
    description: "Developed a comprehensive 3D model of a Mustang car using Blender. Designed the exterior body and implemented animations and motion effects.",
    link: ""
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Cybersecurity Tools",
    technologies: ["Nmap", "Burp Suite", "Metasploit", "Wireshark", "Hydra"]
  },
  {
    category: "Operating Systems",
    technologies: ["Red Hat Enterprise Linux (RHEL)", "Kali Linux", "Ubuntu"]
  },
  {
    category: "Programming",
    technologies: ["Python", "Bash Scripting", "SQL", ".NET Framework"]
  },
  {
    category: "Networking & Cloud",
    technologies: ["TCP/IP", "OSI Model", "DNS", "DHCP", "SSH"]
  },
  {
    category: "Creative & Design",
    technologies: ["Designing", "Video Editing", "Blender (3D Modeling)"]
  }
];

export const CONTACT_INFO = {
  email: "jaysinghvi54@gmail.com",
  linkedin: "https://www.linkedin.com/in/jay-singhvi-9498a1339/",
  github: "https://github.com/Jaysinghvi-04",
  tryhackme: "https://tryhackme.com/p/jaysinghvi54"
};