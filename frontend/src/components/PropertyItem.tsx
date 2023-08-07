import React from "react";
import { Property } from "../models/property.ts";
import { useMultiStepForm } from "../hooks/useMultiStepForm.ts";
import ImageItem from "./ImageItem.tsx";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";

const NUMBER_OF_IMAGES = 3;
const PropertyItem: React.FC<{ property: Property }> = ({ property }) => {
  const imageElements = property.image_urls.map((image) => (
    <ImageItem key={image} title={property.title} imageUrl={image} />
  ));

  const { currentStepIndex, currentStep, back, next } =
    useMultiStepForm(imageElements);

  return (
    <div className="w-96 shadow-lg m-6 rounded-xl col-span-1 overflow-hidden">
      <div className="relative">
        {currentStep}
        <div className="inline-flex">
          {currentStepIndex > 0 && (
            <CaretLeftFill
              size={50}
              color="white"
              onClick={back}
              className="absolute top-2/4 left-1 cursor-pointer"
            />
          )}
          {currentStepIndex < NUMBER_OF_IMAGES - 1 && (
            <CaretRightFill
              size={50}
              color="white"
              onClick={next}
              className="absolute top-2/4 right-1 cursor-pointer"
            />
          )}
        </div>
      </div>
      <h1 className="text-2xl text-center text-blue-800 mb-2 font-bold">
        {property.title}
      </h1>
    </div>
  );
};

export default PropertyItem;
