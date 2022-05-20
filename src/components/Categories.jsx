import React, { useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Muscle from './Muscle';
import BodyPart from './BodyPart';
import Equipment from './Equipment';
import ExercisesContext from '../context/ExercisesContext';

function Categories() {
  const { fetchExercises } = useContext(ExercisesContext);

  const musclesRef = useRef();
  const equipRef = useRef();

  const click = () => {
    const arr = Array.from(musclesRef.current.getElementsByTagName('input'));
    const arr2 = Array.from(equipRef.current.getElementsByTagName('input'));

    const chosenMuscles = [
      ...new Set(
        arr
          .filter((el) => el.checked && el.classList.contains('checkbox'))
          .map((el) => el.value)
      ),
    ];

    const chosenBodyParts = [
      ...new Set(
        arr
          .filter((el) => el.checked && el.classList.contains('checkbox'))
          .map((el) => el.parentElement.parentElement.dataset.name)
      ),
    ];

    const chosenEquipment = arr2
      .filter((el) => el.checked)
      .map((el) => el.value);

    fetchExercises(chosenBodyParts, chosenMuscles, chosenEquipment);
  };

  return (
    <div className="mt-32 w-3/4 flex justify-between">
      <div>
        <p className="text-3xl mb-8 font-bold">Body part</p>

        <div ref={musclesRef} className="form-control w-64">
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
        <div ref={equipRef} className="form-control">
          <Equipment name="Barbell" />
          <Equipment name="Dumbbell" />
          <Equipment name="Weight machine" />
          <Equipment name="Bench" />
          <Equipment name="Resistance bands" />
          <Equipment name="No equipment" />
        </div>
        <Link
          onClick={click}
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