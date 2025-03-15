import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate()

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await loginUser(data).unwrap();
      alert("Login sucessful")
      const {token, user} = response
      dispatch(setUser({user}))
      navigate("/")
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <section className="h-screen bg-gradient-to-bl from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-sm w-full bg-white shadow-2xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <h2 className="text-3xl font-extrabold">Welcome Back!</h2>
          <p className="text-sm italic">Login to explore your magical journey ✨</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
            />
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
            />

            {message && <p className="text-red-500 text-sm">{message}</p>}

            <button
              type="submit"
              disabled={loginLoading} // Disable button while loading
              className={`w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-md shadow-lg transition transform duration-300 ${loginLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'}`}
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="my-4 text-center text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-500 hover:text-blue-500 font-semibold underline"
            >
              Register
            </Link>{' '}
            here.
          </p>
        </div>
      </div> 
    </section>
  );
};

export default Login;
