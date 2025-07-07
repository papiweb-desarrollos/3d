import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

export const CubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25m0-9v9" />
    </svg>
);

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const CoffeeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3.75a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V3.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V3.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 001.5 8.25v9.75A2.25 2.25 0 003.75 20.25h12A2.25 2.25 0 0018 18V8.25A2.25 2.25 0 0015.75 6h-12zM15.75 6v1.5h-12V6h12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 8.25h3.75a.75.75 0 01.75.75v3a.75.75 0 01-.75.75H18v-4.5z" />
    </svg>
  );