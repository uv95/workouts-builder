import React, { useContext, useEffect } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import ExerciseCard from '../ExerciseCard';
import { useAuthStatus } from '../../hooks/useAuthStatus.js';

function Favorites() {
  const { favorites, dispatch } = useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();

  const auth = getAuth();
  const userFavoritesRef = loggedIn
    ? doc(db, 'users', auth.currentUser.uid)
    : null;

  // making sure that the favorites are still there after reloading the page
  useEffect(() => {
    const data = localStorage.getItem('favorites');
    dispatch({
      type: 'RESTORE_FAVORITES_AFTER_RELOADING',
      payload: JSON.parse(data),
    });
  }, []);

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

  if (favorites.length === 0)
    return <p className="text-2xl mt-1">No favorites yet!</p>;

  return (
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-1 gap-20 gap-y-10 ">
      {favorites.map((ex, index) => {
        return <ExerciseCard ex={ex} key={index} />;
      })}
    </div>
  );
}

export default Favorites;
