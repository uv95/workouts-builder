import React, { useContext } from 'react';
import ExercisesContext from '../context/ExercisesContext';

function Exercise() {
  const { searchResults } = useContext(ExercisesContext);

  return (
    <div className="mt-40 text-xl">
      {searchResults.map((ex) => {
        if (
          ex.name.replaceAll(' ', '_').toLowerCase() ===
          window.location.href.slice(window.location.href.lastIndexOf('/') + 1)
        ) {
          return (
            <div className="flex gap-16">
              <img
                className="w-2/5 h-fit rounded-lg"
                src={ex.image}
                alt={ex.name}
              />
              <div>
                <h2 className="font-bold text-3xl mb-6">{ex.name}</h2>
                <div className="mb-6">
                  <p>
                    Muscle: <span className="font-bold">{ex.muscle}</span>
                  </p>
                  <p>
                    Equipment: <span className="font-bold">{ex.equipment}</span>
                  </p>
                </div>
                <p>{ex.description}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Exercise;
