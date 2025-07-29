export const darkCodeTheme = {
  'code[class*="language-"]': {
    background: '#1e1e1e',
    color: '#f8f8f2',  // Brighter default text color
    fontFamily: 'Fira Code, monospace',
    fontSize: '0.95rem',
    lineHeight: '1.6',  // Slightly more spacing
    padding: '1em',
    borderRadius: '8px',
    overflowX: 'auto',
    textShadow: 'none',  // Remove any text shadows
  },
  'pre[class*="language-"]': {
    background: '#1e1e1e',
    color: '#f8f8f2',
    padding: '1.25em',  // Slightly more padding
    margin: '0.5em 0',  // Add vertical margin
    overflow: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',  // Subtle shadow
  },
  // Syntax token colors
  comment: { 
    color: '#6A9955',
    fontStyle: 'italic' 
  },
  string: { 
    color: '#CE9178' 
  },
  keyword: { 
    color: '#569CD6',
    fontWeight: 'bold'  // Make keywords stand out
  },
  function: { 
    color: '#DCDCAA' 
  },
  number: { 
    color: '#B5CEA8' 
  },
  operator: { 
    color: '#D4D4D4' 
  },
  boolean: { 
    color: '#569CD6' 
  },
  punctuation: { 
    color: '#D4D4D4',
    opacity: 0.8  // Slightly dim punctuation
  },
  variable: { 
    color: '#9CDCFE' 
  },
  // Fixes for overlapping/visibility issues
  'pre[class*="language-"] code': {
    display: 'block',
    position: 'relative',
    zIndex: 1,  // Ensure code appears above background
  },
  // Line highlighting (if used)
  'pre[class*="language-"] .token-line.highlight': {
    background: 'rgba(255,255,255,0.05)',
    display: 'inline-block',
    width: '100%',
  },
  // Line numbers (if used)
  'pre[class*="language-"] .linenumber': {
    color: '#858585',
    userSelect: 'none',
    marginRight: '1em',
  },
};  