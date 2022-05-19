import React from 'react';

function Equipment({ name }) {
  return (
    <label className="label cursor-pointer flex justify-start gap-6 mb-3">
      <input
        type="checkbox"
        className="checkbox"
        value={name.toLowerCase().replace(' ', '_')}
      />
      <span className="label-text text-2xl">{name}</span>
    </label>
  );
}

export default Equipment;
