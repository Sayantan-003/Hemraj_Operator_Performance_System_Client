
const SolventIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    role="img"
    aria-label="Solvent Extraction"
  >
    <path d="M9 2v6l-2 4v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8l-2-4V2" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 2h6" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 8h6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="16" r="2" fill="currentColor" opacity="0.3"/>
    <path d="M7 12l2-4M17 12l-2-4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default SolventIcon;