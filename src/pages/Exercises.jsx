import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Muscle from '../components/Muscle';
import BodyPart from '../components/BodyPart';
import Equipment from '../components/Equipment';
import Breadcrumbs from '../components/Breadcrumbs';

function Exercises() {
  const musclesRef = useRef();
  const equipRef = useRef();

  const showExercises = () => {
    const arr = Array.from(musclesRef.current.getElementsByTagName('input'));
    const arr2 = Array.from(equipRef.current.getElementsByTagName('input'));

    const chosenMuscles = [
      ...new Set(
        arr
          .filter((el) => el.checked && el.classList.contains('muscle'))
          .map((el) => el.value)
      ),
    ];

    const chosenBodyParts = [
      ...new Set(
        arr
          .filter((el) => el.checked && el.classList.contains('muscle'))
          .map((el) => el.closest('.bodyPart').dataset.name)
      ),
    ];

    const chosenEquipment = arr2
      .filter((el) => el.checked)
      .map((el) => el.value);

    const chosenCategories = {};
    chosenCategories.bodyParts = chosenBodyParts;
    chosenCategories.muscles = chosenMuscles;
    chosenCategories.equipment = chosenEquipment;

    localStorage.setItem('chosen categories', JSON.stringify(chosenCategories));
  };

  return (
    <>
      <Breadcrumbs index={-3} path="fromExercises" />

      <div className="my-4 w-3/4 flex justify-between h-full">
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
            onClick={showExercises}
            to="/exercises/selected"
            className="btn btn-secondary w-40 mt-24"
          >
            Show
          </Link>
        </div>
      </div>
    </>
  );
}

export default Exercises;
