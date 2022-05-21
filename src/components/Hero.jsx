import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      <h1 className="w-1/2 mt-60 text-9xl font-bold text-center">
        BUILD YOUR WORKOUT
      </h1>
      <div className="flex gap-6 mt-5">
        <Link to="/exercises" className="btn btn-secondary w-40">
          Exercises
        </Link>
        <Link to="/login" className="btn btn-primary w-40">
          build workout
        </Link>
      </div>
    </>
  );
}

export default Hero;
