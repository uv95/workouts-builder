import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
import logo from '../assets/svg/logo.svg';

function Navbar() {
  const auth = getAuth();
  const { loggedIn } = useAuthStatus();

  return (
    <nav className="border-gray-200 bg-base-100 border-b px-10 absolute w-full h-20 flex justify-between items-center z-10">
      <Link
        to="/"
        className="cursor-pointer font-bold text-3xl flex items-center gap-3"
      >
        <img className="w-10" src={logo} alt="" />
        <h1 className="logo">Workouts Builder</h1>
      </Link>
      <div className="flex gap-6">
        <Link to="/exercises" className="btn btn-secondary w-40">
          Exercises
        </Link>
        <Link to="/profile/myworkouts" className="btn btn-primary w-40">
          {loggedIn ? 'My profile' : 'Sign in'}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
