import React from 'react';
import ProgressBars from './ProgressBars';
import Period from './Period';

function Progress({
  handleShowPeriod,
  showPeriod,
  type,
  months,
  completedWorkouts,
}) {
  return (
    <div className="flex flex-col gap-4">
      <Period
        handleShowPeriod={handleShowPeriod}
        showPeriod={showPeriod}
        type={type}
      />
      <ProgressBars
        type={type}
        months={months}
        completedWorkouts={completedWorkouts}
      />
    </div>
  );
}

export default Progress;
