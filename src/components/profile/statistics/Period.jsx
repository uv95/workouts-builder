import React, { useState, useContext } from 'react';
import arrowDown from '../../../assets/svg/down-arrow.svg';
import PeriodItem from './PeriodItem';
import ExercisesContext from '../../../context/ExercisesContext';

function Period({ handleShowPeriod, showPeriod, type }) {
  const { period, dispatch } = useContext(ExercisesContext);

  const setPeriod = (text, number, type) => {
    dispatch({
      type: 'SET_PERIOD',
      payload: { text: text, number: number, type: type.toLowerCase() },
    });
    handleShowPeriod();
  };

  return (
    <div
      className={`${
        showPeriod ? 'h-28' : ' h-8'
      } z-10 shadow-md shadow-gray-200 w-28 py-1 rounded-lg mb-2 bg-base-100`}
    >
      <div
        onClick={handleShowPeriod}
        className="flex items-center gap-3 cursor-pointer px-2"
      >
        <p>{period[type.toLowerCase()].text}</p>
        <img className="w-2" src={arrowDown} alt="arrow down" />
      </div>
      {showPeriod && (
        <div className="flex flex-col gap-1 border-t z-10 ">
          <PeriodItem
            onClick={() => setPeriod('3 months', 3, type)}
            text="3 months"
          />
          <PeriodItem
            onClick={() => setPeriod('6 months', 6, type)}
            text="6 months"
          />
          <PeriodItem onClick={() => setPeriod('Year', 12, type)} text="Year" />
        </div>
      )}
    </div>
  );
}

export default Period;
