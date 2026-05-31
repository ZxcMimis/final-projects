import React from 'react';

interface CategoryIconProps {
  svgString: string;
  size?: number;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ svgString, size = 56, className = '' }) => {
  const resized = svgString
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`);

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: resized }}
    />
  );
};

export default CategoryIcon;