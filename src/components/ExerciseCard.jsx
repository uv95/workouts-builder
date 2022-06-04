import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExercisesContext from '../context/ExercisesContext';
import { ReactComponent as Heart } from '../assets/svg/heart.svg';
import { useAuthStatus } from '../hooks/useAuthStatus.js';
import add from '../assets/svg/add.svg';

function ExerciseCard({ ex }) {
  const { toggleFavorite } = useContext(ExercisesContext);
  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();

  return (
    <div
      onClick={(e) => {
        //shouldn't open the exercise page if you click on Heart button
        if (e.target.nodeName !== 'path')
          navigate(`${ex.name.replaceAll(' ', '_').toLowerCase()}`);
      }}
      className="card w-60 h-80 bg-base-100 shadow-xl cursor-pointer"
    >
      <figure className="w-full h-3/5 bg-blue-300">
        {loggedIn && (
          <div className="absolute top-1 right-2 flex justify-between gap-1">
            <div className="bg-white/75 w-9 h-9 rounded-3xl flex justify-center items-center text-4xl font-bold pb-[5px] text-primary-focus">
              +
            </div>
            <div className="bg-white/75 w-9 h-9 rounded-3xl flex justify-center items-center">
              <Heart
                className={`w-6 h-5 mt-[2px] stroke-1 stroke-red-500 ${
                  ex.favorite ? 'fill-red-500' : 'fill-transparent'
                }`}
                onClick={() => toggleFavorite(ex)}
              />
            </div>
          </div>
        )}
        <img
          className="object-cover w-full h-full"
          src={ex.image}
          alt={ex.name}
        />
      </figure>
      <div className="card-body h-3/5 p-0 mx-4 ">
        <h2 className="card-title h-1/4 mt-5 flex items-start">{ex.name}</h2>
        <div className="mt-4">
          <p>
            Muscle: <span className="font-bold">{ex.muscle}</span>
          </p>
          <p>
            Equipment: <span className="font-bold">{ex.equipment}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
