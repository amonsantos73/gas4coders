import React from 'react';
import CoffeeCard from './CoffeeCard';

const Favorites = ({ favorites, coffees, userId }) => {
  // Filtra os cafés que têm o mesmo ID que os favoritos
  const favoriteCoffees = coffees.filter(coffee => favorites.includes(coffee._id));

  return (
    <div className="text-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <h1 className="col-span-full text-center text-2xl font-bold">Your favorites</h1>
      {favoriteCoffees.map(coffee => (
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

export default Favorites;
