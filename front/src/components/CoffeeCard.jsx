// CoffeeCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CoffeeCard = ({ coffee }) => {
  if (!coffee) {
    return <div>Loading...</div>; // ou qualquer outra lógica de tratamento de carregamento
  }

  const { name, grind_option, region, flavor_profile, image_url } = coffee;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4 bg-gray-800">
      <img src={image_url} alt={name} className="w-full h-48 object-cover" style={{ maxHeight: '200px' }} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{name}</div>
        <div className="mb-2">
          <span className="text-gray-400 text-sm">Grind Option:</span>{' '}
          <span className="text-gray-300 text-sm font-semibold">{grind_option.join(', ')}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-400 text-sm">Region:</span>{' '}
          <span className="text-gray-300 text-sm font-semibold">{region}</span>
        </div>
        <div className="mt-2">
          <span className="text-gray-400 text-sm">Flavor Profile:</span>{' '}
          <span className="text-gray-300 text-sm font-semibold">{flavor_profile.join(', ')}</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          className="text-gray-400 hover:text-red-500 focus:outline-none"
          onClick={() => {
            console.log(`Favorited the coffee ${name}`);
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
