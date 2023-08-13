import { useState } from "react";
import { getProperties } from "../api/properties.js";
import { useQuery } from "@tanstack/react-query";
import PropertyItem from "../components/PropertyItem.js";
import { Property } from "../models/property.js";
import { useSearchParams } from "react-router-dom";
import PaginationButtons from "../components/PaginationButtons.js";

const PropertiesContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')));

  const {
    status,
    error,
    data: properties,
  } = useQuery(['/properties', page], () => getProperties(page), {
    keepPreviousData: true,
  });

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl text-blue-800">Loading properties...</h1>
      </div>
    );
  }
  if (status === 'error') {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  if (page === 0) {
    setPage(1);
  }

  const switchPage = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const previousPage = () => {
    setSearchParams({ page: (page - 1).toString() });
    setPage((prev) => prev - 1);
  };
  const nextPage = () => {
    setSearchParams({ page: (page + 1).toString() });
    setPage((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-blue-800 text-5xl font-bold mt-4'>
        Commercial properties for sale
      </h1>
      <PaginationButtons
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={page}
        switchPage={switchPage}
      />

      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-10'>
        {properties.map((property: Property) => (
          <PropertyItem key={property.property_id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesContainer;
