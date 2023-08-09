import { useState } from "react";
import { getProperties } from "../api/properties.ts";
import { useQuery } from "@tanstack/react-query";
import PropertyItem from "./PropertyItem.tsx";
import { Property } from "../models/property.ts";
import { useSearchParams } from "react-router-dom";
import PaginationButtons from "./PaginationButtons.tsx";

const PropertiesContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")));

  const {
    status,
    error,
    data: properties,
  } = useQuery(["/properties", page], () => getProperties(page), {
    keepPreviousData: true,
  });

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "error") {
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
    <div className="flex flex-col items-center">
      <h1 className="text-blue-800 text-5xl font-bold mt-4">
        Commercial properties for sale
      </h1>
      <PaginationButtons
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={page}
        switchPage={switchPage}
      />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-10">
        {properties.map((property: Property) => (
          <PropertyItem key={property.property_id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesContainer;
