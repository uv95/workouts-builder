import React from 'react';
import { getAuth } from 'firebase/auth';

function Profile() {
  const auth = getAuth();

  return (
    <div className="grid grid-cols-[1fr_3fr] w-full mt-20">
      <div className="bg-red-400 h-20">
        <p className="ml-8 mt-4 text-4xl font-bold">
          {auth.currentUser.displayName}
        </p>
      </div>
      <div className="bg-green-400 row-span-2">
        <p>workouts</p>
      </div>
      <div className="bg-yellow-400">
        <div>menu</div>
      </div>
    </div>
  );
}

export default Profile;
