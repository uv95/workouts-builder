import { createContext, useReducer, useState } from 'react';
import exercisesReducer from './ExercisesReducer';

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const [localStorageData, setLocalStorageData] = useState([]);

  const initialState = {
    searchResults: [],
    exerciseName: '', //this one is for Breadcrumbs
    favorites: [],
    loading: false,
    newSearch: true,
    workouts: [],
  };

  const [state, dispatch] = useReducer(exercisesReducer, initialState);

  const getLocalStorageData = (data) => {
    setLocalStorageData(data);
  };

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

  //display exercises according to the chosen categories
  const fetchExercises = async (bodyPart, muscle, equipment) => {
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

    // if there are already exercises marked as favorite (in localStorage) -> they should be displayed as favorite in new search results
    const exercisesListWithFavorites = exercisesList.map((ex) => {
      return localStorageData.some((ex1) => ex1.name === ex.name)
        ? { ...ex, favorite: true }
        : ex;
    });

    console.log('fetch here');
    dispatch({ type: 'SHOW_EXERCISES', payload: exercisesListWithFavorites });
  };

  return (
    <ExercisesContext.Provider
      value={{
        fetchExercises,
        getLocalStorageData,
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
