import React from "react";

interface ImageItemsProps {
  title: string;
  imageUrl: string;
}
const ImageItem: React.FC<ImageItemsProps> = ({ title, imageUrl }) => {
  return (
    <div className="w-96 h-72 max-h-96 bg-gradient-to-r from-slate-200 to-slate-300">
      <img src={imageUrl} alt={title} loading="lazy" />
    </div>
  );
};

export default ImageItem;
