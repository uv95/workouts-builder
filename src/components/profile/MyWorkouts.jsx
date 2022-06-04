import React, { useState } from 'react';
import ProfileWrapper from './shared/ProfileWrapper';
import { Link } from 'react-router-dom';

function MyWorkouts() {
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <ProfileWrapper>
      {isEmpty && (
        <div className="flex items-center justify-between">
          <p className="text-2xl ">No workouts yet!</p>
          <Link
            to="/exercises"
            className="mr-20 text-lg flex items-center gap-2"
          >
            <p className="text-3xl text-primary mb-1">+</p>
            <p>New workout</p>
          </Link>
        </div>
      )}
    </ProfileWrapper>
  );
}

export default MyWorkouts;
