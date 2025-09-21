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
      src="/ORBIT_ADS_Logo__1_-removebg-preview.png" 
      alt={alt} 
      className={className}
    />
  );
};