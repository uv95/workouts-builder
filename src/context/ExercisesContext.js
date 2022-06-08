import { createContext, useReducer, useState, useRef } from 'react';
import exercisesReducer from './ExercisesReducer';
import { useAuthStatus } from '../hooks/useAuthStatus.js';

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const initialState = {
    searchResults: [],
    exerciseName: '', //this one is for Breadcrumbs
    favorites: [],
    workouts: [],
  };

  const [state, dispatch] = useReducer(exercisesReducer, initialState);

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
    console.log('toggle', ex.favorite);
  };

  const latestFavorites = useRef([]);

  //display exercises according to the chosen categories
  const fetchExercises = async (bodyPart, muscle, equipment) => {
    try {
      const res = await fetch('/exercises.json');
      const data = await res.json();

      let exercisesList = [];

      bodyPart.forEach((bp) => {
        muscle.forEach((mus) => {
          if (!data[bp][mus]) return;
          equipment.forEach((eq) => {
            if (data[bp][mus][eq]) {
              let [exercise] = data[bp][mus][eq];
              //determine muscle and equipment to show on each exercise's card
              if (exercise) {
                exercise.muscle = `${bp[0].toUpperCase()}${bp.slice(1)}`;
                exercise.equipment = `${eq[0].toUpperCase()}${eq
                  .slice(1)
                  .replaceAll('_', ' ')}`;

                exercisesList.push(exercise);
              }
            }
          });
        });
      });

      dispatch({
        type: 'RESTORE_FAVORITES_AFTER_RELOADING',
        payload: JSON.parse(localStorage.getItem('favorites')),
      });

      // if there are already exercises marked as favorite (in localStorage) -> they should be displayed as favorite in new search results
      latestFavorites.current = JSON.parse(localStorage.getItem('favorites'));
      const exercisesListWithFavorites = exercisesList.map((ex) => {
        return latestFavorites.current.some((ex1) => ex1.name === ex.name)
          ? { ...ex, favorite: true }
          : ex;
      });

      dispatch({ type: 'SHOW_EXERCISES', payload: exercisesListWithFavorites });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExercisesContext.Provider
      value={{
        fetchExercises,
        toggleFavorite,
        ...state,
        dispatch,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContext;
