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
    title: "EternalBlue Exploit Analysis (MS17-010)",
    description: "Led a black-box penetration test on a Windows 7 system, successfully exploiting CVE-2017-0144 (EternalBlue) to gain SYSTEM-level privileges. Utilized the Metasploit Framework for reconnaissance, exploitation, and post-exploitation. Collaborators: Jay Singhvi, Khushi Jain.",
    link: "https://github.com/your-username/eternalblue-pentest-report"
  },
  {
    title: "Web Application Security Audit",
    description: "Performed a security audit on a live web application, identifying critical vulnerabilities such as SQL Injection and Cross-Site Scripting (XSS). Provided a detailed report with remediation strategies.",
    link: "https://github.com/your-username/web-app-audit"
  },
  {
    title: "Custom Payload Development",
    description: "Developed a custom Meterpreter payload using Python for a specific engagement scenario, designed to evade common signature-based antivirus detection.",
    link: "https://github.com/your-username/custom-payloads"
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Penetration Testing",
    technologies: ["Network Pentesting", "Web Application Pentesting", "Vulnerability Assessment", "Social Engineering"]
  },
  {
    category: "Tools & Frameworks",
    technologies: ["Metasploit", "Nmap", "Burp Suite", "Wireshark", "Kali Linux", "John the Ripper"]
  },
  {
    category: "Languages & Scripting",
    technologies: ["Python", "Bash", "PowerShell", "C"]
  },
  {
    category: "Security Concepts",
    technologies: ["TCP/IP", "Cryptography", "Windows & Linux Internals", "Active Directory Security"]
  },
  {
    category: "Platforms",
    technologies: ["Docker", "VMware", "Git", "AWS Security"]
  }
];

export const CONTACT_INFO = {
  email: "jaysinghvi54@gmail.com",
  linkedin: "https://www.linkedin.com/in/jay-singhvi-9498a1339/",
  github: "https://github.com/Jaysinghvi-04"
};