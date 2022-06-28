import { createContext, useReducer, useRef } from 'react';
import exercisesReducer from './ExercisesReducer';

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const initialState = {
    searchResults: [],
    exerciseName: '', //this one is for Breadcrumbs
    favorites: [],
    exercise: {},
    workouts: [],
    plannedWorkouts: [],
    showNewWorkout: false,
    period: 'This month', //for statistics
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
  };

  //for the events in calendar
  const toggleCompleted = (event) => {
    if (!event.completed)
      dispatch({
        type: 'MARK_COMPLETED',
        payload: {
          id: event.id,
          color: 'rgb(102, 204, 138)',
        },
      });
    if (event.completed)
      dispatch({
        type: 'MARK_UNCOMPLETED',
        payload: {
          id: event.id,
          color: event.initialColor,
        },
      });
  };

  //display exercises according to the chosen categories
  const latestFavorites = useRef([]);

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
              //determine muscles and equipment to show on each exercise's card
              if (exercise) {
                exercise.muscleGroup = `${bp[0].toUpperCase()}${bp.slice(1)}`;
                exercise.muscle = `${mus[0].toUpperCase()}${mus.slice(1)}`;
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
        if (latestFavorites.current)
          return latestFavorites.current.some((ex1) => ex1.name === ex.name)
            ? { ...ex, favorite: true }
            : ex;
        if (!latestFavorites.current) return exercisesList;
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
        toggleCompleted,
        ...state,
        dispatch,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContext;
