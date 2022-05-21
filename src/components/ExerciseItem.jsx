import React, { useContext, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import Breadcrumbs from './Breadcrumbs';

function ExerciseItem() {
  const { searchResults, getExerciseName } = useContext(ExercisesContext);

  useEffect(() => {
    const name = window.location.href.slice(
      window.location.href.lastIndexOf('/') + 1
    );
    getExerciseName(
      (name.split(' ')[0][0].toUpperCase() + name.slice(1)).replaceAll('_', ' ')
    );
  }, []);

  return (
    <>
      <Breadcrumbs link={window.location.pathname} index={-1} />
      <div className="mt-4 text-xl">
        {searchResults.map((ex, i) => {
          if (
            ex.name.replaceAll(' ', '_').toLowerCase() ===
            window.location.href.slice(
              window.location.href.lastIndexOf('/') + 1
            )
          ) {
            return (
              <div key={i} className="flex gap-16 mx-10">
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
                      Equipment:{' '}
                      <span className="font-bold">{ex.equipment}</span>
                    </p>
                  </div>
                  <p>{ex.description}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default ExerciseItem;
