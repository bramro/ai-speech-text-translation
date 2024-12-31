import React from 'react';

function Navbar() {
  return (
      <nav className="bg-blue-600 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold text-xl">Speech to text to translation</span>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Home</a></li>
            <li><a href="#" className="text-white hover:text-gray-400 transition-colors">About</a></li>
            <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Services</a></li>
            <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>
  );
}

export default Navbar;