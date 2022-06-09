import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import ExerciseCard from '../components/ExerciseCard';
import { useAuthStatus } from '../hooks/useAuthStatus.js';
import Spinner from '../components/Spinner';
import NewWorkout from '../components/NewWorkout';

function SearchResults() {
  const [loading, setLoading] = useState(true);
  const { searchResults, showNewWorkout, favorites, fetchExercises } =
    useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();

  const auth = getAuth();
  const userFavoritesRef = loggedIn
    ? doc(db, 'users', auth.currentUser.uid)
    : null;

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
  }, [loggedIn, searchResults.length]);

  // to avoid problems opening unique exercises
  useEffect(() => {
    localStorage.setItem('search results', JSON.stringify(currentExercises));
  }, [currentExercises]);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('favorites', JSON.stringify(favorites));

      // updates user's favorites in cloud firestore
      const updateFavorites = async () => {
        await updateDoc(userFavoritesRef, {
          favorites: [],
        });
        await updateDoc(userFavoritesRef, {
          favorites: arrayUnion(...favorites),
        });
      };

      updateFavorites();
    }
  }, [favorites]);

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
        />
      </>
    );

  if (searchResults.length === 0 && !loading)
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
