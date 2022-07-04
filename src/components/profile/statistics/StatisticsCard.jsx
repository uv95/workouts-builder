import React from 'react';

function StatisticsCard({ value, percents, difference, weight }) {
  return (
    <>
      <div className="stats stats-vertical w-52 shadow ">
        <div className="stat flex justify-between items-center h-16 px-3">
          <div className="stat-title text-lg">Last month</div>
          <div className="stat-value text-3xl">{value.lastMonth || 0}</div>
        </div>

        <div className="stat flex justify-between items-center h-16 px-3">
          <div className="stat-title text-lg">This month</div>
          <div className="flex flex-col items-end">
            <div className="stat-value text-3xl"> {value.thisMonth || 0}</div>
            {percents ? (
              <div className="stat-desc text-2xs">
                {percents !== 0 &&
                  `${percents > 0 ? '↗︎' : '↘︎'} ${Math.abs(percents)}% (${
                    difference > 0 ? '+' : '-'
                  }${Math.abs(difference)})`}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        {!weight && (
          <div className="stat flex justify-between items-center h-16 px-3">
            <div className="stat-title text-lg">Total</div>
            <div className="stat-value text-3xl">{value.total}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default StatisticsCard;
