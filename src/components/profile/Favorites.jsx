import React, { useContext } from 'react';
import ExercisesContext from '../../context/ExercisesContext';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const { favorites, dispatch } = useContext(ExercisesContext);
  const navigate = useNavigate();

  return (
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-20 gap-y-10">
      {favorites.map((ex, index) => {
        return (
          <div
            onClick={(e) => {
              if (e.target.nodeName !== 'path')
                navigate(`${ex.name.replaceAll(' ', '_').toLowerCase()}`);
            }}
            key={index}
            className="card w-60 h-80 bg-base-100 shadow-xl cursor-pointer"
          >
            <figure className="w-full h-3/5 bg-blue-300">
              {/* <Heart
            className="w-8 h-7 absolute top-1 right-2 fill-red-500"
            onClick={() => {
              dispatch({
                type: 'ADD_TO_FAVORITES',
                payload: ex,
              });
              console.log(favorites);
            }}
          /> */}
              <img
                className="object-cover w-full h-full"
                src={ex.image}
                alt={ex.name}
              />
            </figure>
            <div className="card-body h-3/5 p-0 mx-4 ">
              <h2 className="card-title h-1/4 mt-5 flex items-start">
                {ex.name}
              </h2>
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
      })}
    </div>
  );
}

export default Favorites;
