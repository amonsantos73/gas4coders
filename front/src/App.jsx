import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import CoffeeCarousel from './components/CoffeeCarousel';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [coffeesData, setCoffeesData] = useState([]);

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api");
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const data = await response.json();
        console.log('data', data)
        setCoffeesData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error.message);
      }
    };

    fetchCoffeeData();
  }, []); // Executa apenas uma vez, quando o componente é montado

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div>
      {authenticated ? (
        <>
           <Navbar onLogout={handleLogout} />
           <CoffeeCarousel coffees={coffeesData} /> {/* Renderiza o carousel quando os dados estiverem carregados */}
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
