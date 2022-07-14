import React from 'react';

function Alert({ text, type, position, icon }) {
  return (
    <div
      style={{
        backgroundColor:
          type === 'error' ? 'rgb(248, 114, 114)' : 'rgb(54, 211, 153)',
      }}
      className={`alert shadow-lg text-xs w-64 h-8 ${position}`}
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
            d={icon}
          />
        </svg>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Alert;
