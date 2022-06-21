import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import Alert from './Alert';
import { v4 as uuid } from 'uuid';

function NewWorkout() {
  const { workouts, dispatch, exercise } = useContext(ExercisesContext);
  const [alert, setAlert] = useState({
    show: false,
    text: '',
  });
  const uniqueId = uuid();
  const [value, setValue] = useState(workouts[0]?.name);
  const [workout, setWorkout] = useState({
    name: '',
    exercises: [],
    id: '',
  });

  const { name, exercises, id } = workout;

  const addToWorkout = (e) => {
    e.preventDefault();
    const chosenWorkout = workouts.find((w) => w.name === value);
    if (!chosenWorkout.exercises.some((ex) => ex.name === exercise.name)) {
      dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
      dispatch({
        type: 'ADD_TO_WORKOUT',
        payload: { name: value, exercises: [exercise], id: id },
      });
      localStorage.setItem('workouts', JSON.stringify(workouts));
    } else {
      setAlert({
        show: true,
        text: 'The exercise is already added.',
      });
      setTimeout(() => {
        setAlert({
          show: false,
        });
      }, 2900);
    }
  };

  const selectWorkout = (e) => {
    setValue(e.target.value);
  };

  const createNewWorkout = (e) => {
    e.preventDefault();
    if (workout.name !== '') {
      dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
      dispatch({ type: 'CREATE_NEW_WORKOUT', payload: workout });
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
    if (workout.name === '') {
      setAlert({
        show: true,
        text: 'Please enter name.',
      });
      setTimeout(() => {
        setAlert({
          show: false,
        });
      }, 2900);
    }
  };

  const onChange = (e) => {
    setWorkout({
      name: e.target.value,
      exercises: [exercise],
      id: uniqueId,
    });
  };

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.classList.contains('newWorkoutBackground'))
            dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
        }}
        className="newWorkoutBackground w-full h-full bg-black/30 fixed top-0 left-0 flex justify-center items-center z-10"
      >
        <div className="w-[350px] relative bg-base-100 border flex flex-col items-center pt-3 pb-7 rounded-box">
          <div
            className="cursor-pointer rounded-full bg-base-100 w-6 h-6 absolute -right-5 -top-5 font-bold flex justify-center"
            onClick={() => dispatch({ type: 'TOGGLE_NEW_WORKOUT' })}
          >
            X
          </div>
          <p className="font-bold text-xl mb-5">ADD TO WORKOUT</p>
          <form
            className="bg-base-200 w-[90%] px-3 pb-4 pt-1 rounded-lg text-center mb-5"
            onSubmit={addToWorkout}
          >
            <p className="mb-2">Add to my saved workout</p>
            <div className="flex justify-between">
              <select
                onChange={(e) => selectWorkout(e)}
                value={value}
                className="select select-primary w-2/3 max-w-xs"
              >
                {workouts.map((workout) => (
                  <option key={workout.id} value={workout.name}>
                    {workout.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
          <form
            className="bg-base-200 w-[90%] px-3 pb-4 pt-1 rounded-lg text-center"
            onSubmit={createNewWorkout}
          >
            <p className="mb-2">Create a new workout</p>
            <div className="flex justify-between">
              <input
                type="text"
                value={name}
                placeholder="Workout name"
                className="input input-bordered input-primary w-2/3 max-w-xs"
                onChange={onChange}
              />

              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
          {alert.show && (
            <Alert
              type="error"
              text={alert.text}
              position="absolute -top-10"
              icon="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default NewWorkout;
