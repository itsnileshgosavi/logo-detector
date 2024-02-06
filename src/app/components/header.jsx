'use client'
import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../context/userContext'

const Header = () => {
  const context=useContext(UserContext);
  console.log(context.user);
  const getLoginTokenFromCookies = () => {
    return Cookies.get("JwtToken");
    
  };

  useEffect(() => {
    // Check if the user is already logged in (has a token)
    const token = getLoginTokenFromCookies();
    
  }, []);

 
  return (
    <header className="bg-slate-950 p-4 w-full">
      <nav className="navbar flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="btn btn-ghost text-xl text-white font-bold hover:text-blue-500">LOGO DETECTOR</div>
          </Link>
        </div>
        <div className='flex'>
          {context.user && (
            <ul className='flex m-3 justify-items-center'>
              <li className='m-3'>
                <Link href="/" className='hover:text-blue-500'>Home</Link>
              </li>
              <li className='m-3'>
                <Link href="/profile" className='hover:text-blue-500'>Profile</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          {context.user ? (
            <>
              <Link href="/profile/user" className='hover:text-green-600'>{context.user?.name}</Link>
              <button className="ms-1 px-3 py-0 bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200">Logout</button>
            </>
          ) : (
            <>
            
              <Link href="/login" className='hover:text-yellow-800'>Login</Link>
              <Link href="/signup" className='hover:text-yellow-600'>Sign Up</Link>
              
            </>
            
          )}
        </div>
       
      </nav>
    </header>
  )
}

export default Header