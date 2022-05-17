import React from 'react';

function BodyPart({ name, children, myRef }) {
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title py-0 flex items-center text-2xl">
        {name}
      </div>
      <div className="collapse-content ">{children}</div>
    </div>
  );
}

export default BodyPart;
