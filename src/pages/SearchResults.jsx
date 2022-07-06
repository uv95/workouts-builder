import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import ExerciseCard from '../components/ExerciseCard';
import { useUpdateData } from '../hooks/useUpdateData';
import Spinner from '../components/Spinner';
import NewWorkout from '../components/NewWorkout';

function SearchResults() {
  const { searchResults, showNewWorkout, favorites, workouts, fetchExercises } =
    useContext(ExercisesContext);
  const { updateFavorites, updateWorkouts } = useUpdateData();

  const [loading, setLoading] = useState(true);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = searchResults.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const chosenExercises = JSON.parse(
      localStorage.getItem('chosen categories')
    );
    fetchExercises(
      chosenExercises.bodyParts,
      chosenExercises.muscles,
      chosenExercises.equipment
    );

    searchResults.length > 0 && setLoading(false);
  }, [searchResults.length]);

  // to avoid problems opening unique exercises
  useEffect(() => {
    localStorage.setItem('search results', JSON.stringify(searchResults));
  }, [searchResults]);

  useEffect(() => {
    updateFavorites();
  }, [favorites]);

  useEffect(() => {
    updateWorkouts();
  }, [workouts]);

  if (loading) return <Spinner />;

  if (searchResults.length > 0)
    return (
      <>
        <Breadcrumbs index={-2} path="fromExercises" />
        {showNewWorkout && <NewWorkout />}

        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-20 gap-y-10">
          {currentExercises.map((ex, index) => {
            return <ExerciseCard ex={ex} key={index} />;
          })}
        </div>
        <Pagination
          exercisesPerPage={exercisesPerPage}
          totalExercises={searchResults.length}
          paginate={paginate}
          currentPage={currentPage}
          sourcePage="searchResults"
        />
      </>
    );

  if (searchResults.length === 0)
    return (
      <div className="mt-28 mr-auto ml-20 text-2xl flex flex-col gap-5">
        <Link className="text-lg" to="/exercises">
          &larr; Back
        </Link>
        <p> No exercises found.</p>
      </div>
    );
}

export default SearchResults;
