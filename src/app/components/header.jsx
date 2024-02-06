'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { useContext } from 'react';
import UserContext from '../context/userContext';
import { logout } from '../services/userServices';
import { toast } from 'react-toastify';

const Header = () => {
 
  const context = useContext(UserContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('JwtToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      setIsLoggedIn(false);
      router.push('/login');
      toast.info('Logged out');
    } catch (error) {
      console.error('Error logging out', error);
      toast.error('Error logging out');
    }
  };

  return (
    <header className="bg-slate-950 p-4 w-full">
      <nav className="navbar flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="btn btn-ghost text-xl text-white font-bold hover:text-blue-500">LOGO DETECTOR</div>
          </Link>
        </div>
        <div className="flex">
          {isLoggedIn && (
            <ul className="flex m-3 justify-items-center">
              <li className="m-3">
                <Link href="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li className="m-3">
                <Link href="/profile" className="hover:text-blue-500">
                  Profile
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="ms-1 px-3 py-0 bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-yellow-800">
                Login
              </Link>
              <Link href="/signup" className="hover:text-yellow-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;