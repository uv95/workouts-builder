import React, { useContext, useState } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import { v4 as uuid } from 'uuid';

function AddWeight({ position, date, setWeightAdded, weightAdded, source }) {
  const { dispatch } = useContext(ExercisesContext);
  const [weightEvent, setWeightEvent] = useState({
    start: '',
    title: '',
    id: '',
    classNames: [],
    display: 'block',
    source: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_WEIGHT', payload: weightEvent });
    setWeightAdded(true);
  };
  const onChange = (e) => {
    setWeightEvent({
      start: date,
      title: e.target.value + ' kg',
      id: uuid(),
      classNames: ['weight'],
      display: 'block',
      source: source,
    });
  };

  return (
    <>
      <div
        style={{
          top: position.y + window.scrollY,
          left: position.x + window.scrollX,
          width: position.width,
        }}
        className={`${
          !weightAdded && 'border'
        } absolute z-10 form-control rounded-lg`}
      >
        {!weightAdded && (
          <form
            onSubmit={onSubmit}
            className="input-group items-center h-8 rounded-lg"
          >
            <input
              onChange={onChange}
              type="number"
              placeholder="Weight"
              className="input px-2"
            />
            <button className="btn w-10">Ok</button>
          </form>
        )}
      </div>
    </>
  );
}

export default AddWeight;
