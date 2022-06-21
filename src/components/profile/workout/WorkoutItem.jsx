import React, { useContext, useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import ExercisesContext from '../../../context/ExercisesContext';
import { useParams, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../Breadcrumbs';
import Spinner from '../../Spinner';
import ExerciseCard from '../../ExerciseCard';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/editIcon.svg';
import Switch from '../../Switch';
import MuscleGroup from './MuscleGroup';
import { v4 as uuid } from 'uuid';

function WorkoutItem() {
  const { workouts, dispatch } = useContext(ExercisesContext);
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [workout] = useState(
    JSON.parse(localStorage.getItem('workouts')).find(
      (workout) => workout.id.slice(0, 8) === params.workout
    )
  );
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [muscle, setMuscle] = useState([]);
  const [currWorkout, setCurrWorkout] = useState([]);

  //for Switch component
  const [toggleMuscle, setToggleMuscle] = useState(true);
  const [toggleMuscleGroup, setToggleMuscleGroup] = useState(true);

  useEffect(() => {
    setMuscleGroup([
      ...new Set(workout?.exercises.map((ex) => ex.muscleGroup)),
    ]);
    setMuscle([...new Set(workout?.exercises.map((ex) => ex.muscle))]);

    //workout in form of MuscleGroup=>Muscles=>Exercises for easier use
    const currentWorkout = muscleGroup.map((musGroup) => {
      const mus = workout.exercises
        .filter((e) => e.muscleGroup === musGroup)
        .map((e) => e.muscle);
      const obj = { [musGroup]: [...new Set(mus)] };
      return {
        [musGroup]: Object.values(obj)[0].map((arr) => {
          return {
            [arr]: workout.exercises.filter(
              (ex) => ex.muscle === arr && ex.muscleGroup === musGroup
            ),
          };
        }),
        id: uuid(),
      };
    });

    setCurrWorkout(currentWorkout);
    setLoading(false);
  }, [loading]);

  const onEdit = () => {
    setEdit(!edit);
  };

  const moveMuscleGroup = useCallback((dragIndex, hoverIndex) => {
    setCurrWorkout((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, []);

  useEffect(() => {
    //update the new order of exercises
    const getUpdatedWorkouts = (workouts) => {
      return workouts.map((workout) => {
        if (workout.id.slice(0, 8) === params.workout) {
          const currentMuscleGroups = currWorkout.map(
            (el) => Object.keys(el)[0]
          );
          const sortedExercises = workout.exercises.sort((a, b) => {
            return (
              currentMuscleGroups.indexOf(a.muscleGroup) -
              currentMuscleGroups.indexOf(b.muscleGroup)
            );
          });
          return { ...workout, exercises: sortedExercises };
        } else {
          return workout;
        }
      });
    };
    const updatedWorkouts =
      workouts.length !== 0
        ? getUpdatedWorkouts(workouts)
        : getUpdatedWorkouts(JSON.parse(localStorage.getItem('workouts')));

    dispatch({ type: 'UPDATE_WORKOUTS', payload: updatedWorkouts });
    updatedWorkouts.length !== 0 &&
      localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  }, [currWorkout]);

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
      <div className="w-full rounded-xl px-5 pt-3">
        <div className="flex w-full items-center">
          <h1 className="mr-auto ml-10 font-bold text-3xl">{workout?.name}</h1>
          {edit && (
            <p className="mx-auto">
              You can change the order of muscle groups by dragging and
              dropping.
            </p>
          )}
          <div className="h-12 flex gap-5 items-center">
            {edit && (
              <>
                <Switch
                  text="Show muscles"
                  isChecked={toggleMuscle}
                  handleToggle={() => setToggleMuscle(!toggleMuscle)}
                />

                <Switch
                  text="Show muscle groups"
                  isChecked={toggleMuscleGroup}
                  handleToggle={() => setToggleMuscleGroup(!toggleMuscleGroup)}
                />
              </>
            )}
            {edit ? (
              <div onClick={() => onEdit()} className=" btn btn-primary">
                Save
              </div>
            ) : (
              <EditIcon
                className="fill-secondary cursor-pointer mr-5"
                onClick={() => onEdit()}
              />
            )}
          </div>
        </div>

        {!toggleMuscle && !toggleMuscleGroup ? (
          <div className="mt-8 grid grid-cols-6 gap-y-5">
            {workout.exercises.map((ex, i) => (
              <ExerciseCard ex={ex} key={i} small />
            ))}
          </div>
        ) : (
          currWorkout.map((muscleGroup, i) => (
            <MuscleGroup
              muscleGroup={muscleGroup}
              moveMuscleGroup={moveMuscleGroup}
              key={Object.values(muscleGroup)[1]} //id
              index={i}
              currWorkout={currWorkout}
              toggleMuscle={toggleMuscle}
              toggleMuscleGroup={toggleMuscleGroup}
              edit={edit}
            />
          ))
        )}
      </div>
    </>
  );
}
export default WorkoutItem;
