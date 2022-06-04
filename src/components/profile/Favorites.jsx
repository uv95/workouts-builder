import React, { useContext, useEffect } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import ExerciseCard from '../ExerciseCard';

function Favorites() {
  const { favorites, dispatch } = useContext(ExercisesContext);
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  //update user favorites
  const userFavoritesRef = doc(db, 'users', userId);

  // making sure that the favorites are still there after reloading the page
  useEffect(() => {
    const data = localStorage.getItem('favorites');
    dispatch({
      type: 'RESTORE_FAVORITES_AFTER_RELOADING',
      payload: JSON.parse(data),
    });
  }, []);

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

  return (
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-20 gap-y-10 ">
      {favorites.map((ex, index) => {
        return <ExerciseCard ex={ex} key={index} />;
      })}
    </div>
  );
}

export default Favorites;
