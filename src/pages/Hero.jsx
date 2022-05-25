import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      <h1 className="w-1/2 mt-60 text-8xl font-bold text-center">
        BUILD YOUR WORKOUTS
      </h1>
      <div className="flex gap-6 mt-5">
        <Link to="/exercises" className="btn btn-secondary w-40">
          Exercises
        </Link>
        <Link to="/sign-in" className="btn btn-primary w-40">
          build workout
        </Link>
      </div>
    </>
  );
}

export default Hero;
