import React from 'react';

function WeightModal({ position, onMouseOver, onMouseLeave, onDelete }) {
  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{
        top: position.y + window.scrollY,
        left: position.x + window.scrollX,
        width: position.width,
      }}
      className={`absolute z-10 px-3 py-2 text-lg rounded-tl-md rounded-tr-md`}
    >
      <div
        onClick={onDelete}
        className="cursor-pointer text-base-100 bg-accent-focus hover:bg-accent rounded text-center h-8 flex justify-center items-center w-32"
      >
        <p>Delete</p>
      </div>
    </div>
  );
}

export default WeightModal;
