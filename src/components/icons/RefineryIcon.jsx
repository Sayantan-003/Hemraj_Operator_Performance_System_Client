const RefineryIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    role="img"
    aria-label="Oil Refining"
  >
    <rect x="3" y="14" width="18" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 14v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 10V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8" cy="17" r="1" fill="currentColor"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
    <circle cx="16" cy="17" r="1" fill="currentColor"/>
    <path d="M12 2v2M10 3h4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default RefineryIcon;