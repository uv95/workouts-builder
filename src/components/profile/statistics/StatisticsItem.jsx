import React, { useState, useEffect, useContext } from 'react';
import StatisticsCard from './StatisticsCard';
import Progress from './Progress';
import ExercisesContext from '../../../context/ExercisesContext';
import Spinner from '../../Spinner';

function StatisticsItem({ value, percentage, difference, type }) {
  const { plannedWorkouts } = useContext(ExercisesContext);
  const [showPeriod, setShowPeriod] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const todayMonth = new Date().getMonth();
    setCompletedWorkouts(plannedWorkouts.filter((w) => w.completed));
    setMonthsFromNow([
      ...allMonths.slice(todayMonth),
      ...allMonths.slice(0, todayMonth),
    ]);
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;
  return (
    <>
      <div className="flex flex-col gap-5">
        <p className="text-3xl">{type}</p>
        <StatisticsCard
          value={value}
          percentage={percentage}
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
