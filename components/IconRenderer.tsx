
import React from 'react';
import * as Icons from 'lucide-react';

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
}

const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 16, className, fallback }) => {
  // Simple mapping or dynamic lookup
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const IconComponent = (Icons as any)[iconName] || (Icons as any)[name];

  if (!IconComponent) {
    return <Icons.Globe size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

export default IconRenderer;
