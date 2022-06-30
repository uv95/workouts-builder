import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import Spinner from '../../Spinner';
import StatisticsItem from './StatisticsItem';

function Statistics() {
  const { period, plannedWorkouts, dispatch } = useContext(ExercisesContext);

  const [loading, setLoading] = useState(true);
  const [completedWorkouts, setCompletedWorkouts] = useState({
    lastMonth: 0,
    thisMonth: 0,
    total: 0,
  });
  const [percentageDifference, setPercentageDifference] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const totalCompletedWorkoutsNumber = plannedWorkouts.filter(
      (w) => w.completed
    ).length;

    const today = new Date();
    const thisMonthCompletedWorkouts = plannedWorkouts.filter(
      (w) => w.completed && new Date(w.start).getMonth() === today.getMonth()
    ).length;

    const lastMonthCompletedWorkouts = plannedWorkouts.filter(
      (w) =>
        w.completed && new Date(w.start).getMonth() + 1 === today.getMonth()
    ).length;

    const differenceBetweenMonths =
      thisMonthCompletedWorkouts - lastMonthCompletedWorkouts;

    const percentageDifferenceBetweenMonths =
      Math.trunc(
        (thisMonthCompletedWorkouts / lastMonthCompletedWorkouts) * 100
      ) - 100;

    setCompletedWorkouts({
      lastMonth: lastMonthCompletedWorkouts,
      thisMonth: thisMonthCompletedWorkouts,
      total: totalCompletedWorkoutsNumber,
    });

    setPercentageDifference(percentageDifferenceBetweenMonths);
    setDifference(differenceBetweenMonths);
    setLoading(false);
  }, [plannedWorkouts, period]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="relative flex gap-10 items-start pb-7 border-b">
        <StatisticsItem
          type="Workouts"
          value={completedWorkouts}
          percentage={percentageDifference}
          difference={difference}
        />
      </div>

      <div className="relative flex gap-10 items-start pb-7 mt-5">
        <StatisticsItem
          type="Weight"
          value={completedWorkouts}
          percentage={percentageDifference}
          difference={difference}
        />
      </div>
    </>
  );
}

export default Statistics;
