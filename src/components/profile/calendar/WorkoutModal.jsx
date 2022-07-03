import React, { useState } from 'react';

function WorkoutModal({
  position,
  onMouseOver,
  onMouseLeave,
  onDelete,
  setComplete,
  eventCompleted,
}) {
  const [hover, setHover] = useState(false);

  const setBackgroundColor = () => {
    if (eventCompleted && hover) return 'rgb(53, 122, 251)';
    if (eventCompleted) return 'rgb(5, 87, 240)';
    if (!eventCompleted && hover) return 'rgb(102, 204, 138)';
    if (!eventCompleted) return 'rgb(61, 184, 104)';
  };

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{
        top: position.y + window.scrollY,
        left: position.x + window.scrollX,
        width: position.width,
      }}
      className={`absolute z-10 text-lg py-1 rounded-tl-md rounded-tr-md flex flex-col items-center gap-1`}
    >
      <div
        onClick={setComplete}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: setBackgroundColor(),
        }}
        className="cursor-pointer text-base-100 rounded h-8 flex justify-center items-center w-32"
      >
        <p>{eventCompleted ? 'Uncompleted' : 'Completed'}</p>
      </div>

      <div
        onClick={onDelete}
        className="cursor-pointer text-base-100 bg-accent-focus hover:bg-accent rounded text-center h-8 flex justify-center items-center w-32"
      >
        <p>Delete</p>
      </div>
    </div>
  );
}

export default WorkoutModal;
