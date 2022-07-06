import React, { useContext, useEffect, useState } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import ExerciseCard from '../ExerciseCard';
import NewWorkout from '../NewWorkout';
import { useUpdateData } from '../../hooks/useUpdateData.js';
import Pagination from '../Pagination';

function Favorites() {
  const { favorites, workouts, showNewWorkout } = useContext(ExercisesContext);
  const { updateFavorites, updateWorkouts } = useUpdateData();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = favorites.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    updateFavorites();
  }, [favorites]);

  useEffect(() => {
    updateWorkouts();
  }, [workouts]);

  if (favorites.length === 0 || !favorites)
    return <p className="text-2xl mt-1">No favorites yet!</p>;

  return (
    <div className="flex flex-col items-center">
      {/* <div className="h-full"> */}
      {showNewWorkout && <NewWorkout />}
      <div
        className={`mt-4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-1 gap-20 gap-y-10 ${
          currentPage === 1 ? 'mb-24' : 'mb-96'
        }`}
      >
        {currentExercises.map((ex, index) => {
          return <ExerciseCard ex={ex} key={index} />;
        })}
      </div>
      <div className={currentPage === 1 ? 'mt-6' : 'mt-24'}>
        <Pagination
          exercisesPerPage={exercisesPerPage}
          totalExercises={favorites.length}
          paginate={paginate}
          currentPage={currentPage}
          sourcePage="favorites"
        />
      </div>
    </div>
  );
}

export default Favorites;
