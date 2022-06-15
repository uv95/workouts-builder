import React, { useContext, useEffect, useState } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { ReactComponent as Heart } from '../assets/svg/heart.svg';
import { useAuthStatus } from '../hooks/useAuthStatus.js';
import { useUpdateData } from '../hooks/useUpdateData.js';
import NewWorkout from '../components/NewWorkout';

function ExerciseItem() {
  const [loading, setLoading] = useState(true);
  const {
    toggleFavorite,
    showNewWorkout,
    searchResults,
    favorites,
    workouts,
    dispatch,
  } = useContext(ExercisesContext);

  const location = useLocation();
  const params = useParams();
  const { loggedIn } = useAuthStatus();
  const { updateFavorites, updateWorkouts } = useUpdateData();

  useEffect(() => {
    dispatch({
      type: 'RESTORE_FAVORITES_AFTER_RELOADING',
      payload: JSON.parse(localStorage.getItem('favorites')),
    });
    dispatch({
      type: 'RESTORE_SEARCH_RESULTS_AFTER_RELOADING',
      payload: JSON.parse(localStorage.getItem('search results')),
    });

    dispatch({
      type: 'GET_EXERCISE_NAME',
      payload: (
        params.exercise.split(' ')[0][0].toUpperCase() +
        params.exercise.slice(1)
      ).replaceAll('_', ' '),
    });
    //doesn't work. WHY?
    setLoading(false);
  }, [loggedIn]);

  useEffect(() => {
    updateFavorites();
  }, [loggedIn, favorites]);
  useEffect(() => {
    updateWorkouts();
  }, [loggedIn, workouts]);

  const getCurrentWorkout = () => {
    const workouts = JSON.parse(localStorage.getItem('workouts'));
    const currentWorkout = workouts.find(
      (workout) =>
        workout.id.slice(0, 8) ===
        location.pathname.split('/').slice(-2, -1).join('')
    );
    return currentWorkout;
  };

  // helps find where we get the exercise from (SearchResults page, Favorites or WorkoutItem)
  const getExerciseArray = () => {
    if (location.pathname.startsWith('/exercises')) return searchResults;
    if (location.pathname.startsWith('/profile/favorites')) return favorites;
    if (location.pathname.startsWith('/profile/myworkouts'))
      return getCurrentWorkout().exercises;
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Breadcrumbs
        linkToExercise={location.pathname}
        workoutName={getCurrentWorkout()?.name}
        linkToWorkout={`/profile/myworkouts/${getCurrentWorkout()?.id.slice(
          0,
          8
        )}`}
        index={-1}
        path={
          location.pathname.startsWith('/exercises')
            ? 'fromExercises'
            : location.pathname.startsWith('/profile/favorites')
            ? 'fromFavorites'
            : 'fromWorkout'
        }
      />

      {showNewWorkout && <NewWorkout />}

      <div className="mt-4 text-xl">
        {getExerciseArray().map((ex, i) => {
          if (ex.name.replaceAll(' ', '_').toLowerCase() === params.exercise) {
            return (
              <div key={i} className="flex gap-16 mx-10">
                <img
                  className="w-2/5 h-fit rounded-lg"
                  src={ex.image}
                  alt={ex.name}
                />

                <div>
                  <div className="flex justify-between">
                    <h2 className="font-bold text-3xl mb-6">{ex.name}</h2>
                    {!getCurrentWorkout() && loggedIn && (
                      <div className="flex justify-center gap-5 mr-5 mt-1">
                        <div
                          onClick={() => {
                            dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
                            dispatch({ type: 'GET_EXERCISE', payload: ex });
                          }}
                          className="w-8 h-8 cursor-pointer flex justify-center items-center text-6xl pb-3 text-primary-focus"
                        >
                          +
                        </div>
                        {location.pathname.startsWith('/exercises') && (
                          <Heart
                            className={`w-8 h-7 cursor-pointer mt-[2px] stroke-1 stroke-red-500 ${
                              ex.favorite ? 'fill-red-500' : 'fill-transparent'
                            }`}
                            onClick={() => {
                              toggleFavorite(ex);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
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
