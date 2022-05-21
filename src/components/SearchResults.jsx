import React, { useContext, useState } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Pagination from './Pagination';

function SearchResults() {
  const { searchResults } = useContext(ExercisesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = searchResults.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return searchResults.length > 0 ? (
    <>
      <Breadcrumbs index={-2} />

      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-20 gap-y-10">
        {currentExercises.map((ex, index) => {
          return (
            <Link
              key={index}
              to={`/exercises/selected/${ex.name
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
                      Equipment:{' '}
                      <span className="font-bold">{ex.equipment}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        exercisesPerPage={exercisesPerPage}
        totalExercises={searchResults.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  ) : (
    <div className="mt-28 mr-auto ml-20 text-2xl flex flex-col gap-5">
      <Link className="text-lg" to="/exercises">
        &larr; Back
      </Link>
      <p> No exercises found.</p>
    </div>
  );
}

export default SearchResults;
