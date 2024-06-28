// App.jsx
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import CoffeeCarousel from './components/CoffeeCarousel';
import CoffeeGallery from './components/CoffeeGallery'; // Importe o CoffeeGallery
import Favorites from './components/Favorites';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [coffeesData, setCoffeesData] = useState([]);
  const [activeTab, setActiveTab] = useState('carousel');

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api");
        console.log(response)
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const data = await response.json();
        console.log(data)
        setCoffeesData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error.message);
      }
    };

    fetchCoffeeData();
  }, []);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setActiveTab(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return <Favorites />;
      case 'carousel':
        return <CoffeeCarousel coffees={coffeesData} />;
      case 'all':
        return <CoffeeGallery coffees={coffeesData} />; // Adicione a nova aba de galeria
      default:
        return <CoffeeCarousel coffees={coffeesData} />;
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
            <Login toggleAuthMode={toggleAuthMode} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignUp toggleAuthMode={toggleAuthMode} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
