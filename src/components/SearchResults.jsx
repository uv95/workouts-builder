import React, { useContext } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link } from 'react-router-dom';

function SearchResults() {
  const { searchResults } = useContext(ExercisesContext);

  return searchResults.length > 0 ? (
    <div className="mt-32 grid grid-cols-3 gap-20">
      {searchResults.map((ex, index) => {
        return (
          <Link
            key={index}
            to={`/categories/selected_categories/${ex.name
              .replaceAll(' ', '_')
              .toLowerCase()}`}
          >
            <div className="card w-60 h-80 bg-base-100 shadow-xl">
              <figure className="w-full h-3/5 bg-blue-300">
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
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="mt-32 mr-auto ml-20 text-2xl flex flex-col gap-5">
      <p> No exercises found.</p>
      <Link className="btn w-20" to="/categories">
        Back
      </Link>
    </div>
  );
}

export default SearchResults;
