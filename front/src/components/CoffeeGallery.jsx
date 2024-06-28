// CoffeeGallery.jsx
import React from 'react';
import CoffeeCard from './CoffeeCard';

const CoffeeGallery = ({ coffees }) => {
  if (!coffees || coffees.length === 0) {
    return <div className="text-gray-300">No coffees available.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2">
        {coffees.map((coffee) => (
          <div key={coffee.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
            <CoffeeCard coffee={coffee} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeGallery;