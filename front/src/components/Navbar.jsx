import React from 'react';

const Navbar = ({ setActiveTab, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const handleLogoClick = () => {
    setActiveTab('carousel');
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img
              src="/gas4coders-newlogo.png"
              alt="Gas 4 Coders logo"
              className="h-32 cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="sm:ml-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  My Favorites
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  All Coffees
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center pr-2 sm:ml-6 sm:pr-0">
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
