import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import StatisticsCard from './StatisticsCard';
import SmallCalendar from './SmallCalendar';
import Period from './Period';
import Spinner from '../../Spinner';

function Statistics() {
  const { period, plannedWorkouts, dispatch } = useContext(ExercisesContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completedWorkouts, setCompletedWorkouts] = useState({
    lastMonth: 0,
    thisMonth: 0,
    total: 0,
  });
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
      Math.trunc(
        (thisMonthCompletedWorkouts / lastMonthCompletedWorkouts) * 100
      ) - 100;

    setCompletedWorkouts({
      lastMonth: lastMonthCompletedWorkouts,
      thisMonth: thisMonthCompletedWorkouts,
      total: totalCompletedWorkoutsNumber,
    });

    setDifference(differenceBetweenMonths);
    setLoading(false);
  }, [plannedWorkouts, period]);

  // useEffect(()=>{

  // }, )

  if (loading) return <Spinner />;

  return (
    <div
      onClick={() => showPeriod && setShowPeriod(!showPeriod)}
      className="h-full"
    >
      {/* <div className="flex gap-3"> */}
      {/* <Period
          handleShowCalendar={() => setShowCalendar(true)}
          handleShowPeriod={() => setShowPeriod(!showPeriod)}
          showPeriod={showPeriod}
        /> */}
      {/* {showCalendar && (
          <div className="absolute ml-40 flex justify-center gap-5 border border-gray-100 w-96 px-1 pb-5 pt-2 rounded-lg shadow-md shadow-gray-200 mb-2 bg-base-100 z-10">
            <SmallCalendar />
            <SmallCalendar />
          </div>
        )} */}
      {/* </div> */}
      <div className="flex">
        <StatisticsCard value={completedWorkouts} desc={difference} />
      </div>
    </div>
  );
}

export default Statistics;
