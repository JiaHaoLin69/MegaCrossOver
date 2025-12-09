import React from 'react';
import { type IconType } from 'react-icons'; 
import './link.css'; 
export interface SocialLinkItem {
    id: number;
    Icon: IconType;
    href: string;  
    label: string; 
}

interface SocialLinkProps {
    link: SocialLinkItem;
}

const SocialLink: React.FC<SocialLinkProps> = ({ link }) => {
  return (
    <a 
      href={link.href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={link.label} 
      className="social-link p-2" 
    >
      {}
      <link.Icon className="social-icon" />
    </a>
  );
};

export default SocialLink;