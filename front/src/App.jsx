import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import CoffeeCarousel from './components/CoffeeCarousel';
import CoffeeGallery from './components/CoffeeGallery';
import Favorites from './components/Favorites';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]); 
  const [coffeesData, setCoffeesData] = useState([]);
  const [activeTab, setActiveTab] = useState('carousel');

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api");
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const data = await response.json();
        setCoffeesData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error.message);
      }
    };

    fetchCoffeeData();
  }, []);

  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  
  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  
  const handleLoginSuccess = (userId, userFavorites) => {
    setAuthenticated(true);
    setUserId(userId);
    updateFavorites(userFavorites)
  };

  
  const handleLogout = () => {
    setAuthenticated(false);
    setActiveTab(null);
    setUserId(null);
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return <Favorites favorites={favorites} coffees={coffeesData} userId={userId} updateFavorites={updateFavorites} />;
      case 'carousel':
        return <CoffeeCarousel coffees={coffeesData} favorites={favorites} userId={userId} />;
      case 'all':
        return <CoffeeGallery coffees={coffeesData} favorites={favorites} userId={userId}/>;
      default:
        return <CoffeeCarousel coffees={coffeesData} favorites={favorites} userId={userId} />;
    }
  };

  return (
    <div>
      {authenticated ? (
        <>
          <Navbar setActiveTab={setActiveTab} onLogout={handleLogout} />
          <main>{renderContent()}</main>
        </>
      ) : (
        <>
          {isLogin ? (
            <Login toggleAuthMode={() => setIsLogin(!isLogin)} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignUp toggleAuthMode={() => setIsLogin(!isLogin)} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
