import React from 'react';

function StatisticsCard({ value, desc }) {
  return (
    <>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat flex flex-col items-center w-28">
          <div className="stat-title">Last month</div>
          <div className="stat-value flex justify-center">
            {value.lastMonth}
          </div>
        </div>

        <div className="stat flex flex-col items-center w-28">
          <div className="stat-title">This month</div>
          <div className="stat-value flex justify-center">
            {value.thisMonth}
          </div>
          <div className="stat-desc">
            {desc === 0
              ? 'Same as last month'
              : `${desc > 0 ? '↗︎' : '↘︎'} ${Math.abs(desc)}%`}
          </div>
        </div>

        <div className="stat flex flex-col items-center w-28">
          <div className="stat-title flex justify-center">Total</div>
          <div className="stat-value">{value.total}</div>
        </div>
      </div>

      {/* <div className="stats shadow-md shadow-gray-200 bg-gray-100">
        <div className="stat">
          <div className="stat-title">Total Completed Workouts</div>
          <div className="stat-value">{value}</div>
          <div className="stat-desc">
            {desc === 0
              ? 'Same as last month'
              : `${Math.abs(desc)}% ${
                  desc > 0 ? 'more' : 'less'
                } than last month`}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default StatisticsCard;
