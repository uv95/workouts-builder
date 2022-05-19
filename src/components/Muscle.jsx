import React from 'react';

function Muscle({ muscle }) {
  return (
    <label className="label cursor-pointer flex justify-start gap-6 ">
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        value={muscle.toLowerCase().replace(' ', '_')}
      />
      <span className="label-text text-xl">{muscle}</span>
    </label>
  );
}

export default Muscle;
