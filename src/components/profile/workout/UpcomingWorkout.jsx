import React, { useEffect, useContext, useState } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import Spinner from '../../Spinner';
import WorkoutCard from './WorkoutCard';

function UpcomingWorkout() {
  const { workouts, plannedWorkouts } = useContext(ExercisesContext);
  const [upcomingWorkout, setUpcomingWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  useEffect(() => {
    const getUpcomingWorkout = () => {
      const timestamps = plannedWorkouts.map((w) =>
        Date.parse(new Date(w.start))
      );
      const today = new Date().setUTCHours(-3, 0, 0, 0);
      const futureEvents = timestamps.filter((t) => t >= today);
      const earliestEventIndex = timestamps.indexOf(Math.min(...futureEvents));
      const upcomingWorkoutFullInfo = workouts.find(
        (w) => w.id === plannedWorkouts[earliestEventIndex].initialId
      );
      setUpcomingWorkout({
        ...plannedWorkouts[earliestEventIndex],
        exercises: upcomingWorkoutFullInfo?.exercises,
        name: upcomingWorkoutFullInfo?.name,
      });
    };
    getUpcomingWorkout();
    console.log(workouts);
  }, [plannedWorkouts, workouts]);

  useEffect(() => {
    const getDate = () => {
      const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      };
      const today = new Intl.DateTimeFormat('en-US', options).format(
        new Date()
      );

      if (upcomingWorkout) {
        const upcomingWorkoutDate = new Intl.DateTimeFormat(
          'en-US',
          options
        ).format(new Date(upcomingWorkout.start));

        today === upcomingWorkoutDate
          ? setDate('Today')
          : new Date(upcomingWorkout.start).getDate() - 1 ===
            new Date(today).getDate()
          ? setDate('Tomorrow')
          : setDate(upcomingWorkoutDate);
      }
      setLoading(false);
    };

    getDate();
  }, [upcomingWorkout, loading]);

  console.log(upcomingWorkout, 'upcomingWorkout');
  if (loading && plannedWorkouts.length !== 0) return <Spinner />;

  if (plannedWorkouts.length === 0 || !upcomingWorkout) return;

  return (
    <>
      <p className="text-4xl">Upcoming workout</p>
      <div className="my-7">
        <p className="text-2xl mb-2">{date}</p>
        {upcomingWorkout && <WorkoutCard workout={upcomingWorkout} upcoming />}
      </div>
    </>
  );
}

export default UpcomingWorkout;