import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import { useParams, useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import Spinner from '../Spinner';
import ExerciseCard from '../ExerciseCard';

function WorkoutItem() {
  const { dispatch } = useContext(ExercisesContext);
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [workout, setWorkout] = useState(
    JSON.parse(localStorage.getItem('workouts')).find(
      (workout) => workout.id.slice(0, 8) === params.workout
    )
  );
  const [muscles, setMuscles] = useState([]);

  useEffect(() => {
    setMuscles([...new Set(workout?.exercises.map((ex) => ex.muscle))]);
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <Breadcrumbs
        linkToWorkout={location.pathname}
        workoutName={workout?.name}
        index={-2}
        path={
          location.pathname.startsWith('/profile/myworkouts') && 'fromWorkout'
        }
      />
      <h1 className="mr-auto ml-10 font-bold text-3xl">{workout?.name}</h1>
      <div className="flex flex-col w-full mt-3">
        {muscles &&
          muscles.map((mus, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center mb-10 px-10 card bg-gray-100 rounded-box shadow-lg"
            >
              <p className="font-bold text-2xl">{mus}</p>
              <div className="flex gap-10">
                {workout?.exercises.map(
                  (ex, i) =>
                    ex.muscle === mus && <ExerciseCard ex={ex} key={i} small />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default WorkoutItem;
