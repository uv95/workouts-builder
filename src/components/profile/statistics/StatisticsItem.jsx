import React, { useState, useEffect, useContext } from 'react';
import StatisticsCard from './StatisticsCard';
import Progress from './Progress';
import ExercisesContext from '../../../context/ExercisesContext';

function StatisticsItem({ value, percents, difference, type }) {
  const { plannedWorkouts } = useContext(ExercisesContext);
  const [showPeriod, setShowPeriod] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [monthsFromNow, setMonthsFromNow] = useState([]);
  const [allMonths] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]);

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    setCompletedWorkouts(plannedWorkouts.filter((w) => w.completed));
    setMonthsFromNow([
      ...allMonths.slice(thisMonth),
      ...allMonths.slice(0, thisMonth),
    ]);
  }, [plannedWorkouts]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <p className="text-3xl">
          {type}
          {type === 'Weight' && ' (kg)'}
        </p>
        <StatisticsCard
          value={value}
          percents={percents}
          difference={difference}
          weight={type === 'Weight'}
        />
      </div>

      <Progress
        handleShowPeriod={() => setShowPeriod(!showPeriod)}
        showPeriod={showPeriod}
        type={type}
        months={monthsFromNow}
        completedWorkouts={completedWorkouts}
      />
    </>
  );
}

export default StatisticsItem;
