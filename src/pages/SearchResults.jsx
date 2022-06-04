import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase.config';
import ExerciseCard from '../components/ExerciseCard';
import { useAuthStatus } from '../hooks/useAuthStatus.js';
import Spinner from '../components/Spinner';

function SearchResults() {
  const { searchResults, getLocalStorageData, favorites, dispatch } =
    useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();

  const navigate = useNavigate();

  const auth = getAuth();
  const userFavoritesRef = loggedIn
    ? doc(db, 'users', auth.currentUser.uid)
    : null;

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
    //making sure that the favorites and search results are still there after reloading the page
    if (loggedIn) {
      const data = localStorage.getItem('favorites');
      getLocalStorageData(JSON.parse(data));

      dispatch({
        type: 'RESTORE_FAVORITES_AFTER_RELOADING',
        payload: JSON.parse(data),
      });
    }

    const data2 = localStorage.getItem('search results');
    dispatch({
      type: 'RESTORE_SEARCH_RESULTS_AFTER_RELOADING',
      payload: JSON.parse(data2),
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('search results', JSON.stringify(currentExercises));
  }, [currentExercises]);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('favorites', JSON.stringify(favorites));

      // updates user's favorites in cloud firestore
      userFavoritesRef &&
        (async () => {
          await updateDoc(userFavoritesRef, {
            favorites: [],
          });
          await updateDoc(userFavoritesRef, {
            favorites: arrayUnion(...favorites),
          });
        })();
    }
  }, [favorites]);

  if (searchResults.length > 0)
    return (
      <>
        <Breadcrumbs index={-2} path="fromExercises" />

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
