import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CoffeeCard = ({ coffee }) => {
  if (!coffee) {
    return <div>Loading...</div>; // ou qualquer outra lógica de tratamento de carregamento
  }

  const { name, description, flavor_profile, image_url } = coffee;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img src={image_url} alt={name} className="w-full h-48 object-cover" style={{ maxHeight: '200px' }} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-600 text-sm mt-2">Flavor Profile: {flavor_profile.join(', ')}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          className="text-gray-600 hover:text-red-500 focus:outline-none"
          onClick={() => {
            console.log(`Favoritou o café ${name}`);
          }}
        >
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Favorite
        </button>
      </div>
    </div>
  );
};

export default CoffeeCard;
