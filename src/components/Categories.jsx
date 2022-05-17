import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Muscle from './Muscle';
import BodyPart from './BodyPart';

function Categories() {
  const myRef = useRef();
  // useEffect(() => {
  //   console.log(myRef.current.checked);
  // }, []);

  const click = () => {
    console.log(myRef.current.childNodes[0]);
    // console.log(myRef.current.value);
  };

  return (
    <div className="mt-32 w-3/4 flex justify-between">
      <div>
        <p className="text-3xl mb-8 font-bold">Body part</p>
        <button onClick={click} className="btn">
          click
        </button>
        <div ref={myRef} className="form-control w-64">
          <BodyPart name="Abs">
            <Muscle muscle="Upper" />
            <Muscle muscle="Lower" />
            <Muscle muscle="Obliques" />
          </BodyPart>

          <BodyPart name="Arms">
            <Muscle muscle="Biceps" />
            <Muscle muscle="Triceps" />
          </BodyPart>

          <BodyPart name="Back">
            <Muscle muscle="Upper" />
            <Muscle muscle="Middle" />
            <Muscle muscle="Lower" />
          </BodyPart>

          <BodyPart name="Glutes">
            <Muscle muscle="Maximus" />
            <Muscle muscle="Medius" />
            <Muscle muscle="Minimus" />
          </BodyPart>

          <BodyPart name="Chest">
            <Muscle muscle="Upper" />
            <Muscle muscle="Middle" />
            <Muscle muscle="Lower" />
          </BodyPart>

          <BodyPart name="Legs">
            <Muscle muscle="Quadriceps" />
            <Muscle muscle="Hamstrings" />
            <Muscle muscle="Calves" />
          </BodyPart>

          <BodyPart name="Shoulders">
            <Muscle muscle="Anterior delts" />
            <Muscle muscle="Lateral delts" />
            <Muscle muscle="Rear delts" />
          </BodyPart>
        </div>
      </div>
      <div>
        <p className="text-3xl mb-8 font-bold">Equipment</p>
        <div className="form-control">
          <label className="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text text-2xl">Barbell</span>
          </label>
          <label className="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text text-2xl">Dumbbells</span>
          </label>
          <label className="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text text-2xl">Weight machines</span>
          </label>
          <label className="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text text-2xl">Bench</span>
          </label>
          <label className="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text text-2xl">Resistance bands/Cables</span>
          </label>
          <label className="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text text-2xl">No equipment</span>
          </label>
        </div>
        <Link
          to="/categories/selected_categories"
          className="btn btn-secondary w-52 mt-24"
        >
          Show exercises
        </Link>
      </div>
    </div>
  );
}

export default Categories;
