import React, { useState, useContext } from 'react';
import arrowDown from '../../../assets/svg/down-arrow.svg';
import PeriodItem from './PeriodItem';
import ExercisesContext from '../../../context/ExercisesContext';

function Period({ handleShowCalendar, handleShowPeriod, showPeriod }) {
  const { period, dispatch } = useContext(ExercisesContext);

  const setPeriod = (period) => {
    dispatch({ type: 'SET_PERIOD', payload: period });
  };

  return (
    <div
      className={`${
        showPeriod ? 'h-36' : ' h-10'
      } z-10 shadow-md shadow-gray-200 w-36 py-2 rounded-lg mb-2 bg-base-100`}
    >
      <div
        onClick={handleShowPeriod}
        className="flex gap-2 cursor-pointer mb-1 px-2"
      >
        <p>{period}</p>
        <img className="w-2" src={arrowDown} alt="arrow down" />
      </div>
      {showPeriod && (
        <div className="flex flex-col border-t pt-1 z-10 ">
          <PeriodItem onClick={() => setPeriod('All time')} text="All time" />
          <PeriodItem
            onClick={() => setPeriod('This month')}
            text="This month"
          />
          <PeriodItem
            onClick={() => setPeriod('Last month')}
            text="Last month"
          />
          <PeriodItem
            text="Custom period"
            onClick={() => {
              setPeriod('Custom period');
              handleShowCalendar();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Period;
