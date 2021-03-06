import { useContext, useCallback } from 'react';
import { useAuthStatus } from './useAuthStatus.js';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import ExercisesContext from '../context/ExercisesContext';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

export const useUpdateData = () => {
  const { loggedIn } = useAuthStatus();
  const { favorites, workouts, plannedWorkouts, weight } =
    useContext(ExercisesContext);

  const auth = getAuth();
  const userRef = loggedIn ? doc(db, 'users', auth.currentUser.uid) : null;

  const updateFavorites = useCallback(() => {
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
  }, [loggedIn, favorites]);

  const updateWorkouts = useCallback(() => {
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
  }, [loggedIn, workouts]);

  const updatePlannedWorkouts = useCallback(() => {
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
  }, [loggedIn, plannedWorkouts]);

  const updateWeight = useCallback(() => {
    if (loggedIn && weight !== null) {
      localStorage.setItem('weight', JSON.stringify(weight));

      // updates user's workouts in cloud firestore
      const update = async () => {
        await updateDoc(userRef, {
          weight: [],
        });
        await updateDoc(userRef, {
          weight: arrayUnion(...weight),
        });
      };
      update();
    }
  }, [loggedIn, weight]);

  return {
    updateFavorites,
    updateWorkouts,
    updatePlannedWorkouts,
    updateWeight,
  };
};
