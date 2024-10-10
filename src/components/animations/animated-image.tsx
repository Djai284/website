import React, { useState } from 'react';
import Image, { StaticImageData } from "next/image";

interface AnimatedImageProps {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ src, alt, width, height }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500); // Reset after animation
  };

  return (
    <div 
      className="w-48 h-48 rounded-full bg-gray-300 mx-auto mb-4 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover rounded-full transition-transform duration-500 ${
          isSpinning ? 'rotate-y-180' : ''
        }`}
      />
    </div>
  );
};

export default AnimatedImage;