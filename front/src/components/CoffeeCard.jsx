import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CoffeeCard = ({ coffee, isFavorited, userId }) => {
  const [favorite, setFavorite] = useState(isFavorited);

  useEffect(() => {
    setFavorite(isFavorited);
  }, [isFavorited]);

  const { _id, name, grind_option, region, flavor_profile, image_url } = coffee;

  const handleFavoriteClick = async () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
  
    try {
      const response = await axios.post('http://localhost:3000/add/favorites', {
        coffeeId: _id,
        userId,
      });
  
      if (response.status === 200) {
        if (favorite) {
          console.log(`Unfavorited the coffee ${name}`);
        } else {
          console.log(`Favorited the coffee ${name}`);
        }
  
      } else {
        console.error('Failed to favorite the coffee');
        setFavorite(!newFavoriteState); // cancela a mudança de estado caso dê errado
      }
    } catch (error) {
      console.error('Error:', error.message);
      setFavorite(!newFavoriteState); // cancela a mudança de estado caso dê errado
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto bg-gray-800 h-full">
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
      <div className="px-6 pt-4 pb-2 py-10">
        <button
          type="button"
          className={`focus:outline-none ${favorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Favorite
        </button>
      </div>
    </div>
  );
};

export default CoffeeCard;
