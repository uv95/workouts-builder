import React from 'react';

function ProgressBar({ month, value, style, maxWorkoutsInMonth }) {
  return (
    <div className={`flex items-center gap-3 mb-2 ${style}`}>
      <p className="w-7 text-sm">{month}</p>
      <div className="w-40 bg-base-100 h-2 border rounded">
        <div
          className="bg-secondary h-full rounded"
          style={{ width: `${(value / maxWorkoutsInMonth) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

export default ProgressBar;
