import React, { useContext, useEffect } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import ExerciseCard from '../ExerciseCard';
import { useAuthStatus } from '../../hooks/useAuthStatus.js';
import NewWorkout from '../NewWorkout';

function Favorites() {
  const { favorites, workouts, showNewWorkout } = useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();

  const auth = getAuth();
  const userRef = loggedIn ? doc(db, 'users', auth.currentUser.uid) : null;

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('favorites', JSON.stringify(favorites));

      // updates user's favorites in cloud firestore
      const updateFavorites = async () => {
        await updateDoc(userRef, {
          favorites: [],
        });
        await updateDoc(userRef, {
          favorites: arrayUnion(...favorites),
        });
      };
      updateFavorites();
    }
  }, [favorites, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('workouts', JSON.stringify(workouts));

      // updates user's workouts in cloud firestore
      const updateWorkouts = async () => {
        await updateDoc(userRef, {
          workouts: [],
        });
        await updateDoc(userRef, {
          workouts: arrayUnion(...workouts),
        });
      };
      updateWorkouts();
    }
  }, [workouts, loggedIn]);

  if (favorites?.length === 0 || !favorites)
    return <p className="text-2xl mt-1">No favorites yet!</p>;

  return (
    <>
      {showNewWorkout && <NewWorkout />}
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-1 gap-20 gap-y-10 ">
        {favorites.map((ex, index) => {
          return <ExerciseCard ex={ex} key={index} />;
        })}
      </div>
    </>
  );
}

export default Favorites;
