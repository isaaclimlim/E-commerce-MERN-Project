import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    try {
      await registerUser(data).unwrap();
      alert("Registration successful"); // Fixed typo: "successfull" to "successful"
      navigate('/login');
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <section className="h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-center text-white">
          <h2 className="text-3xl font-bold">Welcome!</h2>
          <p className="text-sm italic">Create your magical account today ✨</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-300"
            />
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-300"
            />
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-300"
            />

            {message && <p className="text-red-500 text-sm">{message}</p>}

            <button
              type="submit"
              disabled={isLoading} // Disable button while loading
              className={`w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-md shadow-lg transition transform duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'}`}
            >
              {isLoading ? 'Registering...' : 'Register'} 
            </button>
          </form>

          <p className="my-4 text-center text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-500 hover:text-purple-500 font-semibold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
