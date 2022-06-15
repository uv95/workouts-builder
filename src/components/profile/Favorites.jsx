import React, { useContext, useEffect } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import ExerciseCard from '../ExerciseCard';
import { useAuthStatus } from '../../hooks/useAuthStatus.js';
import NewWorkout from '../NewWorkout';
import { useUpdateData } from '../../hooks/useUpdateData.js';

function Favorites() {
  const { favorites, workouts, showNewWorkout } = useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();
  const { updateFavorites, updateWorkouts } = useUpdateData();

  useEffect(() => {
    updateFavorites();
  }, [favorites, loggedIn]);

  useEffect(() => {
    updateWorkouts();
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
