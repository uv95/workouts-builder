import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import { ReactComponent as Heart } from '../assets/svg/heart.svg';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

function SearchResults() {
  const { searchResults, getLocalStorageData, favorites, dispatch } =
    useContext(ExercisesContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  //update user favorites
  const userFavoritesRef = doc(db, 'users', userId);

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
    const data = localStorage.getItem('favorites');
    getLocalStorageData(JSON.parse(data));
    dispatch({
      type: 'RESTORE_FAVORITES_AFTER_RELOADING',
      payload: JSON.parse(data),
    });
  }, []);

  //mark/unmark as favorite and add/remove from favorites
  const toggleFavorite = (ex) => {
    if (!ex.favorite) {
      dispatch({
        type: 'MARK_FAVORITE',
        payload: ex,
      });
      dispatch({
        type: 'ADD_TO_FAVORITES',
        payload: ex,
      });
    }
    if (ex.favorite) {
      dispatch({
        type: 'UNMARK_FAVORITE',
        payload: ex,
      });
      dispatch({
        type: 'REMOVE_FROM_FAVORITES',
        payload: ex,
      });
    }
  };

  useEffect(() => {
    //updates user's favorites in cloud firestore
    (async () => {
      await updateDoc(userFavoritesRef, {
        favorites: [],
      });
      await updateDoc(userFavoritesRef, {
        favorites: arrayUnion(...favorites),
      });
    })();

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return searchResults.length > 0 ? (
    <>
      <Breadcrumbs index={-2} />

      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-20 gap-y-10">
        {currentExercises.map((ex, index) => {
          return (
            <div
              onClick={(e) => {
                if (e.target.nodeName !== 'path')
                  navigate(`${ex.name.replaceAll(' ', '_').toLowerCase()}`);
              }}
              key={index}
              className="card w-60 h-80 bg-base-100 shadow-xl cursor-pointer"
            >
              <figure className="w-full h-3/5 bg-blue-300">
                <div className="bg-white/75 w-9 h-9 absolute top-1 right-2 rounded-3xl flex justify-center items-center">
                  <Heart
                    className={`w-6 h-5 mt-[2px] stroke-1 stroke-red-500 ${
                      ex.favorite ? 'fill-red-500' : 'fill-transparent'
                    }`}
                    onClick={() => toggleFavorite(ex)}
                  />
                </div>
                <img
                  className="object-cover w-full h-full"
                  src={ex.image}
                  alt={ex.name}
                />
              </figure>
              <div className="card-body h-3/5 p-0 mx-4 ">
                <h2 className="card-title h-1/4 mt-5 flex items-start">
                  {ex.name}
                </h2>
                <div className="mt-4">
                  <p>
                    Muscle: <span className="font-bold">{ex.muscle}</span>
                  </p>
                  <p>
                    Equipment: <span className="font-bold">{ex.equipment}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        exercisesPerPage={exercisesPerPage}
        totalExercises={searchResults.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  ) : (
    <div className="mt-28 mr-auto ml-20 text-2xl flex flex-col gap-5">
      <Link className="text-lg" to="/exercises">
        &larr; Back
      </Link>
      <p> No exercises found.</p>
    </div>
  );
}

export default SearchResults;
