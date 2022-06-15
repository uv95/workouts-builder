import React, { useContext } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link } from 'react-router-dom';

function Breadcrumbs({
  path,
  linkToExercise,
  linkToWorkout,
  workoutName,
  index,
}) {
  const { exerciseName } = useContext(ExercisesContext);

  // paths to unique exercise page
  const pathFromExercises = [
    ['/', 'Home'],
    ['/exercises', 'Exercises'],
    ['/exercises/selected', 'Selected'],
    [linkToExercise, exerciseName],
  ];
  const pathFromFavorites = [
    ['/profile/favorites', 'Favorites'],
    [linkToExercise, exerciseName],
  ];
  const pathFromWorkout = [
    ['/profile/myworkouts', 'My workouts'],
    [linkToWorkout, workoutName],
    [linkToExercise, exerciseName],
  ];

  // to determine which path to show
  const pathType = () => {
    if (path === 'fromExercises') return pathFromExercises;
    if (path === 'fromFavorites') return pathFromFavorites;
    if (path === 'fromWorkout') return pathFromWorkout;
  };

  return (
    <div className="text-sm breadcrumbs mt-28 mr-auto ml-10">
      <ul>
        {pathType()
          .slice(0, index)
          .map((page, i) => {
            return (
              <li key={i}>
                <Link to={page[0]}>{page[1]}</Link>
              </li>
            );
          })}
        <li
          className="pointer-events-none"
          key={pathType()[pathType().length + index]}
        >
          <p>{pathType()[pathType().length + index][1]}</p>
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
