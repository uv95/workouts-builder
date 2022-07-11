import React from 'react';

function BodyPart({ name, children, checked, onChange, onClick }) {
  return (
    <div className="collapse collapse-arrow">
      <input
        id={name}
        className="h-14"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
      />
      <div className="collapse-title py-0 flex items-center text-2xl">
        {name}
      </div>
      <div
        data-name={name.toLowerCase()}
        className="bodyPart collapse-content "
      >
        {children}
      </div>
    </div>
  );
}

export default BodyPart;
