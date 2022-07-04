import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import StatisticsItem from './StatisticsItem';

function Statistics() {
  const { plannedWorkouts, weight } = useContext(ExercisesContext);

  const [completedWorkouts, setCompletedWorkouts] = useState({
    lastMonth: 0,
    thisMonth: 0,
    total: 0,
  });
  const [lastAddedWeight, setLastAddedWeight] = useState({
    lastMonth: 0,
    thisMonth: 0,
  });
  const [differenceInPercents, setDifferenceInPercents] = useState({
    workouts: 0,
    weight: 0,
  });
  const [difference, setDifference] = useState({
    workouts: 0,
    weight: 0,
  });

  useEffect(() => {
    const today = new Date();
    const getDifferenceInPercents = (thisMonth, lastMonth) => {
      if (thisMonth === 0) return lastMonth * -100;
      if (lastMonth === 0) return thisMonth * 100;
      if (thisMonth > 0 && lastMonth > 0)
        return Math.trunc((thisMonth / lastMonth) * 100) - 100;
    };

    //get data for Workouts Statistics
    const totalCompletedWorkouts = plannedWorkouts.filter(
      (w) => w.completed
    ).length;
    const thisMonthCompletedWorkouts = plannedWorkouts.filter(
      (w) => w.completed && new Date(w.start).getMonth() === today.getMonth()
    ).length;
    const lastMonthCompletedWorkouts = plannedWorkouts.filter(
      (w) =>
        w.completed && new Date(w.start).getMonth() + 1 === today.getMonth()
    ).length;

    const workoutDifferenceBetweenMonths =
      thisMonthCompletedWorkouts - lastMonthCompletedWorkouts;
    const workoutPercents = getDifferenceInPercents(
      thisMonthCompletedWorkouts,
      lastMonthCompletedWorkouts
    );

    //get data for Weight Statistics
    const thisMonthLastAddedWeight = weight
      .filter((w) => new Date(w.start).getMonth() === today.getMonth())
      .sort(
        (a, b) => new Date(b.start).getDate() - new Date(a.start).getDate()
      )[0]?.number;
    const lastMonthLastAddedWeight = weight
      .filter((w) => new Date(w.start).getMonth() + 1 === today.getMonth())
      .sort(
        (a, b) => new Date(b.start).getDate() - new Date(a.start).getDate()
      )[0]?.number;

    const weightDifferenceBetweenMonths =
      thisMonthLastAddedWeight - lastMonthLastAddedWeight;
    const weightPercents = getDifferenceInPercents(
      thisMonthLastAddedWeight,
      lastMonthLastAddedWeight
    );

    setLastAddedWeight({
      lastMonth: lastMonthLastAddedWeight,
      thisMonth: thisMonthLastAddedWeight,
    });
    setCompletedWorkouts({
      lastMonth: lastMonthCompletedWorkouts,
      thisMonth: thisMonthCompletedWorkouts,
      total: totalCompletedWorkouts,
    });
    setDifferenceInPercents({
      workouts: workoutPercents,
      weight: weightPercents,
    });
    setDifference({
      workouts: workoutDifferenceBetweenMonths,
      weight: weightDifferenceBetweenMonths,
    });
  }, [plannedWorkouts, weight]);

  return (
    <>
      <div className="relative flex gap-10 items-start pb-7 border-b">
        <StatisticsItem
          type="Workouts"
          value={completedWorkouts}
          percents={differenceInPercents.workouts}
          difference={difference.workouts}
        />
      </div>

      <div className="relative flex gap-10 items-start pb-7 mt-5">
        <StatisticsItem
          type="Weight"
          value={lastAddedWeight}
          percents={differenceInPercents.weight}
          difference={difference.weight}
        />
      </div>
    </>
  );
}

export default Statistics;
