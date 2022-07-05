import React, { useContext, useState, useEffect } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import ProgressBar from './ProgressBar';

function ProgressBars({ type, months, completedWorkouts }) {
  const { period, weight } = useContext(ExercisesContext);
  const [monthsReversed, setMonthsReversed] = useState([]);
  const [maxCompletedWorkouts, setMaxCompletedWorkouts] = useState(0);
  const [maxLastAddedWeight, setMaxLastAddedWeight] = useState(0);

  useEffect(() => {
    // SET PROGRESS BAR LENGTH:
    // 1) get all workouts for a certain period of time
    const workoutsIn3Months = [
      ...completedWorkouts.filter((w) => w.month === months[0]),
      ...completedWorkouts.filter((w) =>
        months.slice(-2).some((m) => m === w.month)
      ),
    ];
    const workoutsIn6Months = [
      ...completedWorkouts.filter((w) => w.month === months[0]),
      ...completedWorkouts.filter((w) =>
        months.slice(-5).some((m) => m === w.month)
      ),
    ];

    // 2) function to get most repeated element in array
    const getMostFrequent = (arr) => {
      const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(hashmap).reduce((a, b) =>
        hashmap[a] > hashmap[b] ? a : b
      );
    };
    // 3) get month with most workouts in a certain period of time

    const maxWorkoutsIn3Months = workoutsIn3Months.filter(
      (w) =>
        new Date(w.start).getMonth() ===
        +getMostFrequent(
          workoutsIn3Months.slice().map((w) => new Date(w.start).getMonth())
        )
    ).length;
    const maxWorkoutsIn6Months = workoutsIn6Months.filter(
      (w) =>
        new Date(w.start).getMonth() ===
        +getMostFrequent(
          workoutsIn6Months.slice().map((w) => new Date(w.start).getMonth())
        )
    ).length;
    const maxWorkoutsInYear = completedWorkouts.filter(
      (w) =>
        new Date(w.start).getMonth() ===
        +getMostFrequent(
          completedWorkouts.slice().map((w) => new Date(w.start).getMonth())
        )
    ).length;

    // 4) function to get max last added weight in certain period of time
    const getMaxAddedWeight = (months) => {
      return Math.max(
        ...months
          .slice()
          .map(
            (m) =>
              weight
                .filter((w) => w.month === m)
                .sort(
                  (a, b) =>
                    new Date(b.start).getDate() - new Date(a.start).getDate()
                )[0]?.number || 0
          )
      );
    };

    // 5) set max values to define the progress bar length
    if (period[type.toLowerCase()].number === 3) {
      setMaxCompletedWorkouts(maxWorkoutsIn3Months);
      setMaxLastAddedWeight(
        getMaxAddedWeight([months[0], ...months.slice(-2)])
      );
    }
    if (period[type.toLowerCase()].number === 6) {
      setMaxCompletedWorkouts(maxWorkoutsIn6Months);
      setMaxLastAddedWeight(
        getMaxAddedWeight([months[0], ...months.slice(-5)])
      );
    }
    if (period[type.toLowerCase()].number === 12) {
      setMaxCompletedWorkouts(maxWorkoutsInYear);
      setMaxLastAddedWeight(getMaxAddedWeight(months));
    }

    ////////////////////

    setMonthsReversed([
      ...months.slice(-period[type.toLowerCase()].number + 1),
      months[0],
    ]);
  }, [period, completedWorkouts, weight, months]);

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
              workoutsValue={
                completedWorkouts.filter((w) => w.month === month).length || 0
              }
              weightValue={
                weight
                  .filter((w) => w.month === month)
                  .sort(
                    (a, b) =>
                      new Date(b.start).getDate() - new Date(a.start).getDate()
                  )[0]?.number || 0
              }
              type={type}
              month={month}
              maxWorkouts={maxCompletedWorkouts || 1}
              maxWeight={maxLastAddedWeight || 1}
            />
          ))}

        {period[type.toLowerCase()].number === 12 && (
          <div className="flex gap-6">
            <div>
              {monthsReversed.slice(0, 6).map((month, i) => (
                <ProgressBar
                  key={i}
                  workoutsValue={
                    completedWorkouts.filter((w) => w.month === month).length ||
                    0
                  }
                  weightValue={
                    weight
                      .filter((w) => w.month === month)
                      .sort(
                        (a, b) =>
                          new Date(b.start).getDate() -
                          new Date(a.start).getDate()
                      )[0]?.number || 0
                  }
                  type={type}
                  month={month}
                  maxWorkouts={maxCompletedWorkouts || 1}
                  maxWeight={maxLastAddedWeight || 1}
                />
              ))}
            </div>
            <div>
              {monthsReversed.slice(6, 12).map((month, i) => (
                <ProgressBar
                  key={i}
                  workoutsValue={
                    completedWorkouts.filter((w) => w.month === month).length ||
                    0
                  }
                  weightValue={
                    weight
                      .filter((w) => w.month === month)
                      .sort(
                        (a, b) =>
                          new Date(b.start).getDate() -
                          new Date(a.start).getDate()
                      )[0]?.number || 0
                  }
                  type={type}
                  month={month}
                  maxWorkouts={maxCompletedWorkouts || 1}
                  maxWeight={maxLastAddedWeight || 1}
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
