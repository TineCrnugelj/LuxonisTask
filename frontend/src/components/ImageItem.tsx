import React, {Fragment} from "react";

interface ImageItemsProps {
  title: string,
  imageUrl: string,
}
const ImageItem: React.FC<ImageItemsProps> = ({title, imageUrl}) => {
  return (
    <Fragment>
      <img src={imageUrl} alt={title} loading='lazy' />
    </Fragment>

  );
}

export default ImageItem;
