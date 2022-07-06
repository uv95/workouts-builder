import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({
  exercisesPerPage,
  totalExercises,
  paginate,
  currentPage,
  sourcePage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalExercises / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="btn-group mt-auto mx-auto ">
      {pageNumbers.map((number) => (
        <Link
          className={currentPage === number ? 'btn btn-active' : 'btn'}
          key={number}
          onClick={() => paginate(number)}
          to={
            sourcePage === 'searchResults'
              ? '/exercises/selected'
              : '/profile/favorites'
          }
        >
          {number}
        </Link>
      ))}
    </div>
  );
}

export default Pagination;
