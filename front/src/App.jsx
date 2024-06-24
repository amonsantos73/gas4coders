import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login toggleAuthMode={toggleAuthMode} /> : <SignUp toggleAuthMode={toggleAuthMode} />}
    </div>
  );
};

export default App;
