import React, { useState } from 'react';
import logo from '../Day14_logo.png';

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleNavbar = () => {
    setIsOpen(!isOpen);
 };

 return (
    <nav className="fixed top-0 start-0 z-20 w-full border-b border-pink-100 bg-white/90 shadow-sm shadow-pink-900/5 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="My Drop Logo" />
          <span className="self-center whitespace-nowrap text-lg font-bold text-pink-900">Day 14</span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <a href="#calculator" className="rounded-md bg-pink-700 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-200">Plan dates</a>
          <button onClick={toggleNavbar} type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md p-2 text-sm text-pink-900 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-200 md:hidden" aria-controls="navbar-sticky" aria-expanded={isOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full items-center justify-between md:order-1 md:flex md:w-auto`} id="navbar-sticky">
          <ul className="mt-4 flex flex-col rounded-md border border-pink-100 bg-white p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 rtl:space-x-reverse">
            {/*
            <li>
              <a href="/home" className="block py-2 px-3 text-white bg-pink-700 rounded md:bg-transparent md:text-pink-700 md:p-0 md:dark:text-pink-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
 );
};

export default Navbar;
