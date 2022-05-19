import { createContext, useState, useEffect } from 'react';

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

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

            if (exercise) {
              exercise.muscle = `${bodyPart[k][0].toUpperCase()}${bodyPart[
                k
              ].slice(1)}`;
              exercise.equipment = `${equipment[j][0].toUpperCase()}${equipment[
                j
              ]
                .slice(1)
                .replace('_', ' ')}`;
              //   console.log(exercise);
              exercisesList.push(exercise);
            }
          }
        }
      }
    }
    setSearchResults(exercisesList);
  };

  return (
    <ExercisesContext.Provider
      value={{
        fetchExercises,
        searchResults,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContext;
