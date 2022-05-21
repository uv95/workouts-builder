import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="border-gray-200 border-b px-10 absolute w-full h-20 flex justify-between items-center">
      <Link to="/" className="cursor-pointer font-bold text-2xl">
        TEST LOGO
      </Link>
      <div className="flex gap-6">
        <Link to="/exercises" className="btn btn-secondary w-40">
          Exercises
        </Link>
        <Link to="/login" className="btn btn-primary w-40">
          Log In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
