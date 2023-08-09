import React from "react";

interface ImageItemsProps {
  title: string;
  imageUrl: string;
}
const ImageItem: React.FC<ImageItemsProps> = ({ title, imageUrl }) => {
  return (
    <img
      className="max-h-96 bg-gradient-to-r from-slate-200 to-slate-300"
      src={imageUrl}
      alt={title}
      loading="lazy"
    />
  );
};

export default ImageItem;
