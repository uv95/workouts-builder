import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExercisesContext from '../../../context/ExercisesContext';

function WorkoutCard({
  editWorkout,
  workoutId,
  workout,
  saveWorkout,
  onChange,
  upcoming,
}) {
  const { dispatch } = useContext(ExercisesContext);

  const navigate = useNavigate();

  const removeExercise = (workout, ex) => {
    dispatch({
      type: 'REMOVE_FROM_WORKOUT',
      payload: { workout: workout, exercise: ex },
    });
  };

  return (
    <div
      onClick={() =>
        !editWorkout && !upcoming && navigate(workout.id.slice(0, 8))
      }
      className={`${
        upcoming ? 'bg-info' : 'bg-neutral-content cursor-pointer'
      } relative rounded-xl flex justify-between p-3 w-2/3 shadow-md ${
        editWorkout && workout?.id === workoutId && 'h-56 flex-col'
      }`}
    >
      {editWorkout && workout?.id === workoutId && (
        <div onClick={saveWorkout} className="absolute right-5 btn btn-primary">
          Save
        </div>
      )}
      <div className="flex flex-col gap-1">
        {editWorkout && workout?.id === workoutId ? (
          <input
            type="text"
            defaultValue={workout?.name}
            className="input w-60 max-w-xs bg-transparent placeholder-neutral font-bold text-xl"
            onChange={onChange}
          />
        ) : (
          <p className="font-bold text-xl">{workout?.name}</p>
        )}

        <p className={`${upcoming ? 'text-neutral' : 'text-gray-400'} text-sm`}>
          <span className="text-neutral">Muscle groups: </span>
          {[...new Set(workout?.exercises.map((ex) => ex.muscleGroup))].join(
            ', '
          )}
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
                  editWorkout && workout?.id === workoutId ? 'w-14 ' : 'w-12'
                }
              >
                {editWorkout && workout?.id === workoutId && (
                  <div
                    onClick={() => removeExercise(workout, ex)}
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
    </div>
  );
}

export default WorkoutCard;
