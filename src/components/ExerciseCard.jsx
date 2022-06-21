import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExercisesContext from '../context/ExercisesContext';
import { ReactComponent as Heart } from '../assets/svg/heart.svg';
import { useAuthStatus } from '../hooks/useAuthStatus.js';

function ExerciseCard({ ex, small }) {
  const { dispatch, toggleFavorite } = useContext(ExercisesContext);

  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();

  const onClick = (e) => {
    //shouldn't open the exercise page if you click on Heart button
    if (e.target.nodeName !== 'path' && e.target.innerText !== '+') {
      navigate(`${ex.name.replaceAll(' ', '_').toLowerCase()}`);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`card ${
        small ? 'w-40 h-40' : 'w-60 h-80'
      } bg-base-100 shadow-xl cursor-pointer`}
    >
      <figure className={`${small ? 'h-1/2' : 'h-3/5'} w-full bg-blue-300`}>
        {!small && loggedIn && (
          <div className="absolute top-1 right-2 flex justify-between gap-1">
            <div
              className="bg-white/75 w-9 h-9 rounded-3xl flex justify-center items-center text-4xl font-bold pb-[5px] text-primary-focus"
              onClick={() => {
                dispatch({ type: 'TOGGLE_NEW_WORKOUT' });
                dispatch({ type: 'GET_EXERCISE', payload: ex });
              }}
            >
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
      <div className={`${small ? 'mx-2' : 'mx-4'} card-body h-3/5 p-0`}>
        <h2
          className={`${
            small ? 'font-bold text-sm mt-3 leading-3' : 'mt-5'
          } card-title h-1/4 flex items-start`}
        >
          {ex.name}
        </h2>
        <div className={small ? 'mt-1' : 'mt-4'}>
          {!small && (
            <p>
              Muscle: <span className="font-bold">{ex.muscleGroup}</span> (
              {ex.muscle})
            </p>
          )}
          <p className={small && 'text-xs leading-3'}>
            Equipment: <span className="font-bold">{ex.equipment}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
