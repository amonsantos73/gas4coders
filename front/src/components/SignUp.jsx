import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const SignUp = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    username: yup.string().required('Username é obrigatório'),
    password: yup.string().required('Senha é obrigatória').min(4, 'A senha deve ter pelo menos 4 caracteres'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem coincidir')
      .required('Confirmação de senha é obrigatória'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate({ email, username, password, confirmPassword }, { abortEarly: false });
      console.log('Cadastro válido:', { email, username, password, confirmPassword });
      await axios.post('http://localhost:3000/create', {
        email,
        username,
        password
      });
      setErrors({});
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else if (err.response) {
        console.error('Erro na resposta do servidor:', err.response.data);
      } else if (err.request) {
        console.error('Erro na requisição:', err.request);
      } else {
        console.error('Erro:', err.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full px-3 py-2 mt-1 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`block w-full px-3 py-2 mt-1 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300`}
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full px-3 py-2 mt-1 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`block w-full px-3 py-2 mt-1 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300`}
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <a 
            href="#" 
            onClick={toggleAuthMode} 
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Already have an account? Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
