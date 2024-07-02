import React from 'react';
import CoffeeCard from './CoffeeCard';

const CoffeeGallery = ({ coffees, favorites, userId }) => {
  console.log(userId)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {coffees.map(coffee => (
        <CoffeeCard
          key={coffee._id}
          coffee={coffee}
          isFavorited={favorites.includes(coffee._id)}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default CoffeeGallery;
