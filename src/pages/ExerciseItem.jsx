import React, { useContext, useEffect, useState } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { ReactComponent as Heart } from '../assets/svg/heart.svg';
import { useAuthStatus } from '../hooks/useAuthStatus.js';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

function ExerciseItem() {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(ExercisesContext);
  const location = useLocation();
  const params = useParams();

  const searchResults1 = JSON.parse(localStorage.getItem('search results'));
  const favorites1 = JSON.parse(localStorage.getItem('favorites'));

  useEffect(() => {
    dispatch({
      type: 'GET_EXERCISE_NAME',
      payload: (
        params.exercise.split(' ')[0][0].toUpperCase() +
        params.exercise.slice(1)
      ).replaceAll('_', ' '),
    });
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

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
          ? searchResults1
          : favorites1
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
                  <div className="flex justify-between">
                    <h2 className="font-bold text-3xl mb-6">{ex.name}</h2>
                    <div className="flex justify-center gap-5 mr-5 mt-1">
                      <div className="w-8 h-8 cursor-pointer flex justify-center items-center text-6xl pb-3 text-primary-focus">
                        +
                      </div>
                      <Heart
                        className={`w-8 h-7 cursor-pointer mt-[2px] stroke-1 stroke-red-500 ${
                          ex.favorite ? 'fill-red-500' : 'fill-transparent'
                        }`}
                        // onClick={() => {
                        //  toggleFavorite(ex);
                        // }}
                      />
                    </div>
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
