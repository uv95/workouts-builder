import React from 'react';
import ExerciseCard from '../../ExerciseCard';

function SeparateMuscle({ toggleMuscle, muscles, index }) {
  return (
    <div
      className={`${
        toggleMuscle ? 'mx-10' : index === 0 && 'ml-10'
      } flex flex-col items-center p-3`}
    >
      {toggleMuscle && <p className="text-lg">{Object.keys(muscles)}</p>}
      <div className="flex gap-6">
        {Object.values(muscles)[0].map((ex, i) => (
          <ExerciseCard ex={ex} key={i} small />
        ))}
      </div>
    </div>
  );
}

export default SeparateMuscle;
