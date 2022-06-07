import React from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuthStatus';

function ProfileWrapper({ children }) {
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="grid  lg:grid-cols-[300px_1fr] md:grid-cols-[300px_1fr] sm:grid-cols-[230px_1fr] w-full mt-32 grid-rows-[80px_1fr]">
      <div className="h-20">
        <p className="ml-10 mt-4 text-4xl font-bold">
          {auth.currentUser.displayName}
        </p>
      </div>
      <div className="ml-14 mt-6 row-span-2 sm:row-span-2">{children}</div>
      <div className="py-4 text-center ">
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to=" "
        >
          <p className="ml-5">My workouts</p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="favorites"
        >
          <p className="ml-5">Favorite exercises</p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="calendar"
        >
          <p className="ml-5">Calendar</p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="statistics"
        >
          <p className="ml-5">Statistics</p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="measurements"
        >
          <p className="ml-5">Measurements</p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="setting"
        >
          <p className="ml-5">Setting</p>
        </Link>
        <button onClick={onLogout} className="btn btn-secondary mt-10">
          Sign out
        </button>
      </div>
    </div>
  );
}

export default ProfileWrapper;
