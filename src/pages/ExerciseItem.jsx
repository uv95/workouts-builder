import React, { useContext, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLocation, useParams } from 'react-router-dom';

function ExerciseItem() {
  const { dispatch } = useContext(ExercisesContext);
  const location = useLocation();
  const params = useParams();
  const searchResults = JSON.parse(localStorage.getItem('search results'));
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  useEffect(() => {
    dispatch({
      type: 'GET_EXERCISE_NAME',
      payload: (
        params.exercise.split(' ')[0][0].toUpperCase() +
        params.exercise.slice(1)
      ).replaceAll('_', ' '),
    });
  }, []);

  return (
    <>
      <Breadcrumbs
        link={location.pathname}
        index={-1}
        path={
          location.pathname.startsWith('/exercises')
            ? 'fromExercises'
            : 'fromFavorites'
        }
      />
      <div className="mt-4 text-xl">
        {/* the exercise renders from either search results or favorites (both stored in localStorage) */}
        {(location.pathname.startsWith('/exercises')
          ? searchResults
          : favorites
        ).map((ex, i) => {
          if (ex.name.replaceAll(' ', '_').toLowerCase() === params.exercise) {
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
