import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from '@fullcalendar/interaction';

function ExternalEvents({ workout, index }) {
  const eventsRef = useRef(null);
  const [exercises, setExercises] = useState(workout.exercises);
  const [colors] = useState([
    '#8fd6ff',
    '#f9b6ff',
    '#ecf48d',
    '#9affed',
    '#c29aff',
    '#ffcd7d',
    '#b7ff7d',
  ]);

  useEffect(() => {
    const draggable = new Draggable(eventsRef.current, {
      itemSelector: '.workout',
      eventData: (workout) => {
        return {
          title: workout.getAttribute('title'),
          id: workout.id,
          color: workout.style.backgroundColor,
        };
      },
    });
    return () => draggable.destroy();
  });

  return (
    <div
      ref={eventsRef}
      id={workout.id}
      title={workout.name}
      style={{ backgroundColor: `${colors[index % colors.length]}` }}
      className="workout h-10 w-32 p-2 cursor-pointer text-sm rounded-lg text-center leading-5 block truncate"
    >
      {workout.name}
    </div>
    //{' '}
  );
}

export default React.memo(ExternalEvents);
