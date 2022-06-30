import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import ProgressBar from './ProgressBar';

function ProgressBars({ type, months, completedWorkouts }) {
  const { period } = useContext(ExercisesContext);
  const [monthsReversed, setMonthsReversed] = useState([]);
  const [completedWorkoutsWithMonths, setCompletedWorkoutsWithMonths] =
    useState([]);
  const [maxCompletedWorkoutsInMonth, setMaxCompletedWorkoutsInMonth] =
    useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    completedWorkouts &&
      setCompletedWorkoutsWithMonths(
        completedWorkouts.slice().map((w) => {
          return {
            ...w,
            month: new Date(w.start).toLocaleString('default', {
              month: 'short',
            }),
          };
        })
      );

    setMonthsReversed([
      ...months.slice(-period[type.toLowerCase()].number + 1),
      months[0],
    ]);

    //Max workouts in a month is for progress bar length
    function getMostFrequent(arr) {
      const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(hashmap).reduce((a, b) =>
        hashmap[a] > hashmap[b] ? a : b
      );
    }
    getMostFrequent(
      completedWorkouts.slice().map((w) => new Date(w.start).getMonth())
    );

    setMaxCompletedWorkoutsInMonth(
      completedWorkouts.filter(
        (w) =>
          new Date(w.start).getMonth() ===
          +getMostFrequent(
            completedWorkouts.slice().map((w) => new Date(w.start).getMonth())
          )
      ).length
    );
    setLoading(false);
  }, [period[type.toLowerCase()].number]);

  if (loading) return;
  return (
    <div
      className={`${
        period[type.toLowerCase()].number > 3 && 'h-48'
      } absolute top-14 shadow px-4 pb-3 pt-4 rounded-box `}
    >
      <div className="flex flex-col gap-1">
        {period[type.toLowerCase()].number !== 12 &&
          [
            ...months.slice(-period[type.toLowerCase()].number + 1),
            months[0],
          ].map((month, i) => (
            <ProgressBar
              key={i}
              style="mb-1"
              value={
                completedWorkoutsWithMonths.filter((w) => w.month === month)
                  .length
              }
              month={month}
              maxWorkoutsInMonth={maxCompletedWorkoutsInMonth}
            />
          ))}

        {period[type.toLowerCase()].number === 12 && (
          <div className="flex gap-6">
            <div>
              {monthsReversed.slice(0, 6).map((month, i) => (
                <ProgressBar
                  key={i}
                  value={
                    completedWorkoutsWithMonths.filter((w) => w.month === month)
                      .length
                  }
                  month={month}
                  maxWorkoutsInMonth={maxCompletedWorkoutsInMonth}
                />
              ))}
            </div>
            <div>
              {monthsReversed.slice(6, 12).map((month, i) => (
                <ProgressBar
                  key={i}
                  value={
                    completedWorkoutsWithMonths.filter((w) => w.month === month)
                      .length
                  }
                  month={month}
                  maxWorkoutsInMonth={maxCompletedWorkoutsInMonth}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBars;
