import React from 'react';

function Alert({ text, type }) {
  return (
    <div
      className={`absolute top-24 alert alert-${type} shadow-lg text-xs w-64 h-8`}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Alert;
