import {getProperties} from '../api/properties.ts';
import {useQuery} from '@tanstack/react-query';
import PropertyItem from "./PropertyItem.tsx";
import {Property} from "../models/property.ts";
const PropertiesContainer = () => {
  const propertiesQuery = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  if (propertiesQuery.status === 'loading') {
    return <h1>Loading...</h1>
  }
  if (propertiesQuery.status === 'error') {
    return <h1>{JSON.stringify(propertiesQuery.error)}</h1>;
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-blue-700 text-5xl font-bold'>Commercial properties for sale</h1>
      <p>Pagination here</p>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-10'>
        {propertiesQuery.data.map((property: Property) => (
          <PropertyItem key={property.property_id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default PropertiesContainer;
