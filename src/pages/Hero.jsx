import React from 'react';
import { Link } from 'react-router-dom';
import fitness4 from '../assets/svg/fitness4.jpg';

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${fitness4})`,
      }}
      className="w-screen bg-cover hero min-h-screen z-0"
    >
      <div className="min-h-screen bg-white/25 w-full flex flex-col justify-center items-center text-center gap-6">
        <h1 className="w-1/2 -mt-64 text-8xl font-bold z-10">
          BUILD YOUR WORKOUTS
        </h1>
        <Link
          to="/exercises"
          className="btn btn-primary w-40 z-10 mt-5 shadow-xl shadow-white/25"
        >
          build workout
        </Link>
      </div>
    </div>
  );
}

export default Hero;
