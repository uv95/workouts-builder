import React, { useRef } from 'react';
import SeparateMuscle from './SeparateMuscle';
import { useDrag, useDrop } from 'react-dnd';

function MuscleGroup({
  toggleMuscleGroup,
  toggleMuscle,
  index,
  moveMuscleGroup,
  muscleGroup,
  edit,
}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'muscleGroupCard',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveMuscleGroup(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'muscleGroupCard',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: edit,
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="mt-5 flex bg-gray-100 gap-5 items-center mb-8 rounded-lg px-5"
    >
      {toggleMuscleGroup && (
        <p className="font-bold text-2xl">{Object.keys(muscleGroup)[0]}</p>
      )}
      <div className="flex w-full ">
        {muscleGroup[Object.keys(muscleGroup)[0]].map((muscles, i) => (
          <SeparateMuscle
            toggleMuscle={toggleMuscle}
            muscles={muscles}
            key={i}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

export default MuscleGroup;
