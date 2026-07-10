import React, { useEffect, useState } from 'react';

export const CleanLogo = ({ src, alt, className }) => {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    // Only process images that are local and specifically target the Doctor Clinic logo
    if (!src || !src.includes('Doctor Clinic Management System')) {
      setProcessedSrc(src);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Loop through pixel values [r, g, b, a]
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Threshold: swap black/very dark pixels (RGB all under 45) to pure white
        if (r < 45 && g < 45 && b < 45) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      try {
        setProcessedSrc(canvas.toDataURL());
      } catch (err) {
        console.warn("Canvas export failed due to security context. Using fallback source.");
        setProcessedSrc(src);
      }
    };
  }, [src]);

  return (
    <img
      src={processedSrc}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
};
