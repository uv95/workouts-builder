import React, { useContext } from 'react';
import { useAuthStatus } from './useAuthStatus.js';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import ExercisesContext from '../context/ExercisesContext';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

export const useUpdateData = () => {
  const { loggedIn } = useAuthStatus();
  const { favorites, workouts, plannedWorkouts } = useContext(ExercisesContext);

  const auth = getAuth();
  const userRef = loggedIn ? doc(db, 'users', auth.currentUser.uid) : null;

  const updateFavorites = () => {
    if (loggedIn && favorites !== null) {
      localStorage.setItem('favorites', JSON.stringify(favorites));

      // updates user's favorites in cloud firestore
      const update = async () => {
        await updateDoc(userRef, {
          favorites: [],
        });
        await updateDoc(userRef, {
          favorites: arrayUnion(...favorites),
        });
      };
      update();
    }
  };

  const updateWorkouts = () => {
    if (loggedIn && workouts !== null) {
      localStorage.setItem('workouts', JSON.stringify(workouts));

      // updates user's workouts in cloud firestore
      const update = async () => {
        await updateDoc(userRef, {
          workouts: [],
        });
        await updateDoc(userRef, {
          workouts: arrayUnion(...workouts),
        });
      };
      update();
    }
  };
  const updatePlannedWorkouts = () => {
    if (loggedIn && plannedWorkouts !== null) {
      localStorage.setItem('planned workouts', JSON.stringify(plannedWorkouts));

      // updates user's workouts in cloud firestore
      const update = async () => {
        await updateDoc(userRef, {
          plannedWorkouts: [],
        });
        await updateDoc(userRef, {
          plannedWorkouts: arrayUnion(...plannedWorkouts),
        });
      };
      update();
    }
  };

  return { updateFavorites, updateWorkouts, updatePlannedWorkouts };
};
