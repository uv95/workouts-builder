import { createContext, useReducer, useState } from 'react';
import exercisesReducer from './ExercisesReducer';

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const [localStorageData, setLocalStorageData] = useState([]);

  const initialState = {
    searchResults: [],
    exerciseName: '',
    favorites: [],
  };

  const [state, dispatch] = useReducer(exercisesReducer, initialState);

  const getLocalStorageData = (data) => {
    setLocalStorageData(data);
  };

  const fetchExercises = async (bodyPart, muscle, equipment) => {
    const res = await fetch('../exercises.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(),
    });
    const data = await res.json();

    let exercisesList = [];

    for (let k = 0; k < bodyPart.length; k++) {
      for (let i = 0; i < muscle.length; i++) {
        if (!data[bodyPart[k]][muscle[i]]) continue;
        for (let j = 0; j < equipment.length; j++) {
          if (data[bodyPart[k]][muscle[i]][equipment[j]]) {
            let [exercise] = data[bodyPart[k]][muscle[i]][equipment[j]];
            //determine muscle and equipment to show on each exercise's card
            if (exercise) {
              exercise.muscle = `${bodyPart[k][0].toUpperCase()}${bodyPart[
                k
              ].slice(1)}`;
              exercise.equipment = `${equipment[j][0].toUpperCase()}${equipment[
                j
              ]
                .slice(1)
                .replaceAll('_', ' ')}`;

              exercisesList.push(exercise);
            }
          }
        }
      }
    }

    // if there are already exercises marked as favorite (in localStorage) -> they should be displayed as favorite in new search results
    const exercisesListWithFavorites = exercisesList.map((ex) => {
      return localStorageData.some((ex1) => ex1.name === ex.name)
        ? { ...ex, favorite: true }
        : ex;
    });

    dispatch({ type: 'SHOW_EXERCISES', payload: exercisesListWithFavorites });
  };

  return (
    <ExercisesContext.Provider
      value={{
        fetchExercises,
        getLocalStorageData,
        ...state,
        dispatch,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContext;
