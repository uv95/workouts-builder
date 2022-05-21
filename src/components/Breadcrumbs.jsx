import React, { useContext } from 'react';
import ExercisesContext from '../context/ExercisesContext';
import { Link } from 'react-router-dom';

function Breadcrumbs({ link, index }) {
  const { exerciseName } = useContext(ExercisesContext);

  const pages = [
    ['/', 'Home'],
    ['/exercises', 'Exercises'],
    ['/exercises/selected', 'Selected'],
    [link, exerciseName],
  ];

  return (
    <div className="text-sm breadcrumbs mt-28 mr-auto ml-10">
      <ul>
        {pages.slice(0, index).map((page, i) => {
          return (
            <li key={i}>
              <Link to={page[0]}>{page[1]}</Link>
            </li>
          );
        })}
        <li className="pointer-events-none" key={pages[pages.length + index]}>
          <p>{pages[pages.length + index][1]}</p>
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
