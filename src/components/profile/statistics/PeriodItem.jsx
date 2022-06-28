import React, { useState } from 'react';

function PeriodItem({ text, onClick }) {
  const [hover, setHover] = useState(false);
  const setBackgroundColor = () => {
    return hover && 'rgb(229, 231, 235)';
  };
  return (
    <p
      onClick={onClick}
      // onClick={onClick}
      className="cursor-pointer px-2"
      style={{
        backgroundColor: setBackgroundColor(),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </p>
  );
}

export default PeriodItem;
