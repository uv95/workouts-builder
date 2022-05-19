import React, { useContext } from 'react';
import ExercisesContext from '../context/ExercisesContext';

function SearchResults() {
  const { searchResults } = useContext(ExercisesContext);

  return (
    <div className="mt-32 grid grid-cols-3 gap-20">
      {searchResults.map((ex, index) => {
        return (
          <div key={index} className="card w-60 h-80 bg-base-100 shadow-xl">
            <figure className="w-full h-3/5 bg-blue-300">
              <img
                className="object-cover w-full h-full"
                src={ex.image}
                alt="dumbbell_crunch"
              />
            </figure>
            <div className="card-body h-3/5 p-0 mx-4 ">
              <h2 className="card-title h-1/4 mt-5 flex items-start">
                {ex.name}
              </h2>
              <div className="mt-4">
                <p>
                  Muscle: <span className="font-bold">{ex.muscle}</span>
                </p>
                <p>
                  Equipment: <span className="font-bold">{ex.equipment}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
