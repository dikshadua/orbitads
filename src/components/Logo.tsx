import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-20 w-auto", 
  alt = "Orbit Ads Logo" 
}) => {
  return (
    <img 
      src="/ChatGPT Image Oct 2, 2025, 08_48_45 PM.png" 
      alt={alt} 
      className={className}
    />
  );
};