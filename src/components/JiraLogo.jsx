const JiraLogo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Jira-like logo: 4 connected dots forming a square pattern */}
      <g fill="currentColor" className="text-black">
        {/* Top Left */}
        <circle cx="8" cy="8" r="3" />
        {/* Top Right */}
        <circle cx="24" cy="8" r="3" />
        {/* Bottom Left */}
        <circle cx="8" cy="24" r="3" />
        {/* Bottom Right */}
        <circle cx="24" cy="24" r="3" />
        
        {/* Connecting lines */}
        <line x1="8" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="24" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  );
};

export default JiraLogo;
