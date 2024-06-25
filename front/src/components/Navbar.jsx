import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Importar o ícone de xícara

const Navbar = ({ setActiveTab, onLogout }) => {
  const handleLogout = () => {
    onLogout(); // Chama a função de logout passada por props
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Ícone de xícara no canto esquerdo */}
          <div className="flex-shrink-0">
            <FontAwesomeIcon icon={faCoffee} className="h-8 w-8 text-white" />
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open. */}
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-800 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          {/* Botão de logout */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
