import React, { useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ExercisesContext from '../../../context/ExercisesContext';

function ProfileWrapper({ children }) {
  const { dispatch } = useContext(ExercisesContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    auth.signOut();
    localStorage.removeItem('favorites');
    localStorage.removeItem('workouts');
    localStorage.removeItem('planned workouts');
    localStorage.removeItem('weight');
    navigate('/');
  };

  // making sure that all data is still there after reloading the page
  useEffect(() => {
    dispatch({
      type: 'RESTORE_DATA',
      payload: {
        searchResults: JSON.parse(localStorage.getItem('search results')) || [],
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        workouts: JSON.parse(localStorage.getItem('workouts')) || [],
        plannedWorkouts:
          JSON.parse(localStorage.getItem('planned workouts')) || [],
        weight: JSON.parse(localStorage.getItem('weight')) || [],
      },
    });
  }, []);

  return (
    <div className="grid lg:grid-cols-[300px_1fr] md:grid-cols-[300px_1fr] sm:grid-cols-[230px_1fr] w-full mt-32 grid-rows-[80px_1fr]">
      <div className="h-20">
        <p className="ml-10 mt-4 text-4xl font-bold">
          {auth.currentUser.displayName}
        </p>
      </div>
      <div className="ml-14 mt-6 row-span-2 sm:row-span-2">{children}</div>
      <div className="py-4 text-center ">
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="myworkouts"
        >
          <p
            className={`ml-5 ${
              location.pathname.endsWith('/myworkouts') && 'font-bold'
            }`}
          >
            My workouts
          </p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="favorites"
        >
          <p
            className={`ml-5 ${
              location.pathname.endsWith('/favorites') && 'font-bold'
            }`}
          >
            Favorite exercises
          </p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="calendar"
        >
          <p
            className={`ml-5 ${
              location.pathname.endsWith('/calendar') && 'font-bold'
            }`}
          >
            Calendar
          </p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="statistics"
        >
          <p
            className={`ml-5 ${
              location.pathname.endsWith('/statistics') && 'font-bold'
            }`}
          >
            Statistics
          </p>
        </Link>
        <Link
          className="flex m-5 pb-2 sm:text-xl md:text-5 pb-2xl border-b lg:text-2xl border-b"
          to="settings"
        >
          <p
            className={`ml-5 ${
              location.pathname.endsWith('/settings') && 'font-bold'
            }`}
          >
            Settings
          </p>
        </Link>
        <button onClick={onLogout} className="btn btn-secondary mt-10">
          Sign out
        </button>
      </div>
    </div>
  );
}

export default ProfileWrapper;
