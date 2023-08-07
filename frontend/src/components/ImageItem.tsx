import React, { useState } from "react";

interface ImageItemsProps {
  title: string;
  imageUrl: string;
}
const ImageItem: React.FC<ImageItemsProps> = ({ title, imageUrl }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className="max-h-96 bg-gradient-to-r from-slate-200 to-slate-300"
      src={imageUrl}
      alt={title}
      loading="lazy"
      onLoad={() => setLoaded(true)}
    />
  );
};

export default ImageItem;
