import React, { useEffect, useContext, useState } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import WorkoutCard from './WorkoutCard';
import UpcomingWorkout from './UpcomingWorkout';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/editIcon.svg';
import Alert from '../../Alert';
import { useAuthStatus } from '../../../hooks/useAuthStatus.js';
import { useUpdateData } from '../../../hooks/useUpdateData.js';
import { v4 as uuid } from 'uuid';

function MyWorkouts() {
  const { workouts, plannedWorkouts, dispatch } = useContext(ExercisesContext);
  const uniqueId = uuid();

  const [showAlert, setShowAlert] = useState(false);
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutId, setWorkoutId] = useState('');
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const { loggedIn } = useAuthStatus();
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
  }, [workouts, loggedIn]);
  useEffect(() => {
    updatePlannedWorkouts();
  }, [plannedWorkouts, loggedIn]);

  const onEdit = (workout) => {
    setWorkoutId(workout?.id);
    setEditWorkout(true);
  };

  const onChange = (e) => {
    if (e.target.defaultValue !== '' && e.target.value === '')
      setNewWorkoutName(e.target.defaultValue);

    if (e.target.value !== '') {
      setNewWorkoutName(e.target.value);
      setIsChanged(true);
    }
  };

  const saveWorkout = (workout) => {
    setEditWorkout(false);
    if (isChanged)
      dispatch({
        type: 'CHANGE_WORKOUT_NAME',
        payload: { workout: workout, name: newWorkoutName, id: uniqueId },
      });
    setIsChanged(false);
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
      {workouts === null || workouts.length === 0 ? (
        <div className="flex justify-between mt-1">
          <p className="text-2xl ">No workouts yet!</p>
          <div
            to="/exercises"
            className="mr-20 text-lg flex items-center gap-2"
          >
            <p className="text-3xl text-primary mb-1">+</p>
            <p>New workout</p>
          </div>
        </div>
      ) : (
        <>
          <UpcomingWorkout />
          <ul>
            <p className="text-4xl mt-14 mb-7">My workouts</p>
            {workouts.map((workout) => (
              <li key={workout.id} className="flex items-center gap-10 mb-7 ">
                <WorkoutCard
                  workout={workout}
                  workoutId={workoutId}
                  saveWorkout={() => saveWorkout(workout)}
                  editWorkout={editWorkout}
                  onChange={onChange}
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
