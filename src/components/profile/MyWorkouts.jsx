import React, { useEffect, useContext } from 'react';
import ProfileWrapper from './shared/ProfileWrapper';
import { Link } from 'react-router-dom';
import ExercisesContext from '../../context/ExercisesContext';

function MyWorkouts() {
  const { workouts, dispatch } = useContext(ExercisesContext);

  useEffect(() => {
    console.log(workouts);
  }, []);

  return (
    <ProfileWrapper>
      {workouts.length === 0 ? (
        <div className="flex justify-between mt-1">
          <p className="text-2xl ">No workouts yet!</p>
          <Link
            to="/exercises"
            className="mr-20 text-lg flex items-center gap-2"
          >
            <p className="text-3xl text-primary mb-1">+</p>
            <p>New workout</p>
          </Link>
        </div>
      ) : (
        <ul>
          {workouts.map((workout, i) => (
            <li key={i}>
              <p>{workout.name}</p>
              <ul>
                {workout.exercises.length > 0 &&
                  workout.exercises.map((ex, index) => (
                    <li key={index}>{ex.name}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </ProfileWrapper>
  );
}

export default MyWorkouts;
