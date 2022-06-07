import React from 'react';

function BodyPart({ name, children }) {
  return (
    <div className="collapse collapse-arrow">
      <input className="h-14" type="checkbox" />
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
