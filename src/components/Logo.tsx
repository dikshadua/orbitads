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
      src="/ChatGPT_Image_Oct_2__2025__08_34_04_PM-removebg-preview.svg" 
      alt={alt} 
      className={className}
    />
  );
};