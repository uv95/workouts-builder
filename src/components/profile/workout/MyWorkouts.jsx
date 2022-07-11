import React, { useEffect, useContext, useState } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import WorkoutCard from './WorkoutCard';
import UpcomingWorkout from './UpcomingWorkout';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/editIcon.svg';
import Alert from '../../Alert';
import { useUpdateData } from '../../../hooks/useUpdateData.js';
import { Link } from 'react-router-dom';

function MyWorkouts() {
  const { workouts, plannedWorkouts, dispatch } = useContext(ExercisesContext);

  const [showAlert, setShowAlert] = useState(false);
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutId, setWorkoutId] = useState('');

  const { updateWorkouts, updatePlannedWorkouts } = useUpdateData();

  const onDelete = (workout) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      dispatch({
        type: 'DELETE_WORKOUT',
        payload: workout.id,
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2900);
    }
  };

  useEffect(() => {
    updateWorkouts();
  }, [workouts]);
  useEffect(() => {
    updatePlannedWorkouts();
  }, [plannedWorkouts]);

  const onEdit = (workout) => {
    setWorkoutId(workout?.id);
    setEditWorkout(true);
  };

  const onChange = (e, workout) => {
    if (e.target.defaultValue !== '' && e.target.value === '')
      dispatch({
        type: 'CHANGE_WORKOUT_NAME',
        payload: { id: workout.id, name: e.target.defaultValue },
      });

    if (e.target.value !== '')
      dispatch({
        type: 'CHANGE_WORKOUT_NAME',
        payload: { id: workout.id, name: e.target.value },
      });
  };

  const saveWorkout = () => {
    setEditWorkout(false);
  };

  return (
    <>
      {showAlert && (
        <Alert
          type="success"
          text="Workout successfully deleted."
          position="absolute top-28"
          icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )}
      {!workouts || workouts.length === 0 ? (
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
        <>
          <UpcomingWorkout />
          <ul>
            <p className="text-3xl mb-6">My workouts</p>
            {workouts.map((workout) => (
              <li key={workout.id} className="flex items-center gap-10 mb-7 ">
                <WorkoutCard
                  workout={workout}
                  workoutId={workoutId}
                  saveWorkout={saveWorkout}
                  editWorkout={editWorkout}
                  onChange={(e) => onChange(e, workout)}
                />

                <div className="flex gap-3">
                  <EditIcon
                    className="fill-secondary cursor-pointer"
                    onClick={() => onEdit(workout)}
                  />
                  <DeleteIcon
                    className="fill-accent cursor-pointer"
                    onClick={() => onDelete(workout)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}{' '}
    </>
  );
}

export default MyWorkouts;
