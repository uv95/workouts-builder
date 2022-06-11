import React, { useContext, useState } from 'react';
import ExercisesContext from '../context/ExercisesContext';

function NewWorkout() {
  const { workouts, dispatch, exercise } = useContext(ExercisesContext);
  const [value, setValue] = useState(workouts[0]?.name);
  const [workout, setWorkout] = useState({
    name: '',
    exercises: [],
  });

  const { name, exercises } = workout;

  const addToWorkout = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
    dispatch({
      type: 'ADD_TO_WORKOUT',
      payload: { name: value, exercises: [exercise] },
    });
    localStorage.setItem('workouts', JSON.stringify(workouts));
  };

  const selectWorkout = (e) => {
    setValue(e.target.value);
  };

  const createNewWorkout = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
    dispatch({ type: 'CREATE_NEW_WORKOUT', payload: workout });
    localStorage.setItem('workouts', JSON.stringify(workouts));
  };

  const onChange = (e) => {
    setWorkout({
      name: e.target.value,
      exercises: [exercise],
    });
  };

  return (
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
              {workouts.map((workout, index) => (
                <option key={index} value={workout.name}>
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
      </div>
    </div>
  );
}

export default NewWorkout;
