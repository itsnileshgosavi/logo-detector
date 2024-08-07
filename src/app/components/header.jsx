'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import UserContext from '../context/userContext';
import { logout } from '../services/userServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
 
  const context = useContext(UserContext);
   

  const router=useRouter();


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('JwtToken');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
    
      setIsLoggedIn(false);
      router.push('/login');
      toast.info('Logged out');
    } catch (error) {
      console.error('Error logging out', error);
      toast.error('Error logging out');
    }
  };

  return (
    <header className=" p-4 w-full h-14 flex justify-center items-center bg-neutral">
      <nav className="navbar flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="btn btn-ghost font-poppins text-sm md:text-xl text-primary font-extrabold hover:text-blue-500">LOGO DETECTOR</div>
          </Link>
        </div>
        <div className="md:flex hidden">
          {isLoggedIn && (
            <ul className="flex m-3 justify-items-center text-primary font-poppins font-bold uppercase">
              <li className="m-3">
                <Link href="/" className={`hover:text-blue-500 ${pathname === '/' ? 'text-red-500 font-extrabold' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="m-3">
                <Link href="/profile" className={`hover:text-blue-500 ${pathname === '/profile' ? 'text-red-500' : ''}`}>
                  Profile
                </Link>
              </li>
              <li className="m-3">
                <Link href="/detect" className={`hover:text-blue-500 ${pathname === '/detect' ? 'text-red-500' : ''}`}>
                  Detect with Clarifai
                </Link>
              </li>
              <li className="m-3">
                <Link href="/genai" className={`hover:text-blue-500 ${pathname === '/genai' ? 'text-red-500' : ''}`}>
                  Detect with AI<div class="badge badge-primary badge-outline">new</div>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex space-x-4 text-primary font-poppins font-bold">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="hidden md:block bg-red-600 p-3 text-white rounded-lg font-bold focus:ring-1 active:scale-95 hover:bg-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600 p-3 bg-base-100 dark:bg-gray-600 font-bold rounded-lg">
                Login
              </Link>
              <Link href="/signup" className="hover:text-blue-600 p-3 bg-primary rounded-lg text-neutral">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {isLoggedIn && <div class="dropdown dropdown-end m-0 md:hidden">
          <div tabindex="0" role="button" class="btn m-1 font-poppins font-extralight">&#9776;</div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-auto p-2 shadow">
          <li className="m-3">
                <Link href="/" className={`hover:text-blue-500 ${pathname === '/' ? 'text-red-500' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="m-3">
                <Link href="/profile" className={`hover:text-blue-500 ${pathname === '/profile' ? 'text-red-500' : ''}`}>
                  Profile ({context.user[0]?.name})
                </Link>
              </li>
              <li className="m-3">
                <Link href="/detect" className={`hover:text-blue-500 ${pathname === '/detect' ? 'text-red-500' : ''}`}>
                  Detect with Clarifai
                </Link>
              </li>
              <li className="m-3">
                <Link href="/genai" className={`hover:text-blue-500 ${pathname === '/genai' ? 'text-red-500' : ''}`}>
                  Detect with AI<div class="badge badge-primary badge-outline">new</div>
                </Link>
              </li>
              <li><button onClick={handleLogout} className=" ms-1 px-3 py-0 bg-red-700 text-white font-bold rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200">Logout</button></li>
          </ul>
        </div>}
      </nav>
    </header>
  );
};

export default Header;