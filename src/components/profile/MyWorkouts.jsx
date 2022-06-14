import React, { useEffect, useContext, useState } from 'react';
import ProfileWrapper from './shared/ProfileWrapper';
import { Link } from 'react-router-dom';
import ExercisesContext from '../../context/ExercisesContext';
import { ReactComponent as DeleteIcon } from '../../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/svg/editIcon.svg';
import Alert from '../Alert';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { useAuthStatus } from '../../hooks/useAuthStatus.js';
import { v4 as uuid } from 'uuid';

function MyWorkouts() {
  const { workouts, dispatch } = useContext(ExercisesContext);
  const uniqueId = uuid();

  const [showAlert, setShowAlert] = useState(false);
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutId, setWorkoutId] = useState('');
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const { loggedIn } = useAuthStatus();

  const auth = getAuth();
  const userRef = loggedIn ? doc(db, 'users', auth.currentUser.uid) : null;
  // useEffect(() => {
  //   console.log(newWorkoutName, 'newWorkoutName');
  // }, []);

  const onDelete = (workout) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      dispatch({ type: 'DELETE_WORKOUT', payload: workout });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2900);
    }

    localStorage.setItem('workouts', JSON.stringify(workouts));
  };
  useEffect(() => {
    if (loggedIn && workouts !== null) {
      localStorage.setItem('workouts', JSON.stringify(workouts));

      // updates user's workouts in cloud firestore
      const updateWorkouts = async () => {
        await updateDoc(userRef, {
          workouts: [],
        });
        await updateDoc(userRef, {
          workouts: arrayUnion(...workouts),
        });
      };
      updateWorkouts();
    }
  }, [workouts, loggedIn]);

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
    <ProfileWrapper>
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
          {workouts.map((workout) => (
            <div key={workout.id} className="flex items-center gap-10 mb-7 ">
              <li
                className={`relative rounded-xl flex justify-between bg-neutral-content p-3 w-2/3 shadow-md ${
                  editWorkout && workout?.id === workoutId && 'h-56 flex-col'
                }`}
              >
                {editWorkout && workout?.id === workoutId && (
                  <div
                    onClick={() => saveWorkout(workout)}
                    className="absolute right-5 btn btn-primary"
                  >
                    Save
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {editWorkout && workout?.id === workoutId ? (
                    <input
                      type="text"
                      defaultValue={workout?.name}
                      className="input w-44 max-w-xs bg-transparent placeholder-neutral font-bold text-xl"
                      onChange={onChange}
                    />
                  ) : (
                    <p className="font-bold text-xl">{workout?.name}</p>
                  )}

                  <p className="text-gray-400 text-sm">
                    <span className="text-neutral">Muscle groups: </span>
                    {[
                      ...new Set(workout?.exercises.map((ex) => ex.muscle)),
                    ].join(', ')}
                  </p>
                </div>
                <div
                  className={
                    editWorkout && workout?.id === workoutId
                      ? 'grid grid-cols-8 grid-rows-2 gap-2'
                      : 'avatar-group -space-x-6'
                  }
                >
                  {workout?.exercises.length > 0 &&
                    workout?.exercises.map((ex, index) => (
                      <div key={index} className="avatar">
                        <div
                          className={
                            editWorkout && workout?.id === workoutId
                              ? 'w-14 '
                              : 'w-12'
                          }
                        >
                          {editWorkout && workout?.id === workoutId && (
                            <div
                              onClick={() => {
                                dispatch({
                                  type: 'REMOVE_FROM_WORKOUT',
                                  payload: { workout: workout, exercise: ex },
                                });
                              }}
                              className="cursor-pointer absolute right-1 badge badge-xs bg-accent border-accent w-2 flex justify-center items-center pb-[2px]"
                            >
                              x
                            </div>
                          )}
                          <img
                            className={`${
                              editWorkout &&
                              workout?.id === workoutId &&
                              ' mask mask-circle'
                            } object-cover w-full h-full`}
                            src={ex.image}
                            alt={ex.name}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </li>

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
            </div>
          ))}
        </ul>
      )}
    </ProfileWrapper>
  );
}

export default MyWorkouts;
