import React, { useEffect, useState } from 'react';

function Exercise() {
  //   const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchExercise = async () => {
    const res = await fetch('../exercises.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(),
    });
    const data = await res.json();
    // setImage(data.abs.upper.dumbbell[0].image);
    setName(data.abs.upper.dumbbell[0].name);
    setDescription(data.abs.upper.dumbbell[0].description);
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  return (
    <div className="card w-60 h-80 bg-base-100 shadow-xl">
      <figure>{/* <img src={require(`../img/${image}`)} alt="" /> */}</figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Exercise;
