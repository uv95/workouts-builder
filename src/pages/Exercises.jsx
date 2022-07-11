import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Muscle from '../components/Muscle';
import BodyPart from '../components/BodyPart';
import Equipment from '../components/Equipment';
import Breadcrumbs from '../components/Breadcrumbs';

function Exercises() {
  const musclesRef = useRef();
  const equipRef = useRef();

  const [equipment] = useState([
    'Barbell',
    'Dumbbell',
    'Weight machine',
    'Bench',
    'Resistance bands',
    'No equipment',
  ]);
  const [bodyPart, setBodyPart] = useState([
    { name: 'Abs', checked: false, muscles: ['Upper', 'Lower', 'Obliques'] },
    { name: 'Arms', checked: false, muscles: ['Biceps', 'Triceps'] },
    { name: 'Back', checked: false, muscles: ['Upper', 'Middle', 'Lower'] },
    {
      name: 'Glutes',
      checked: false,
      muscles: ['Maximus', 'Medius', 'Minimus'],
    },
    { name: 'Chest', checked: false, muscles: ['Upper', 'Middle', 'Lower'] },
    {
      name: 'Legs',
      checked: false,
      muscles: ['Quadriceps', 'Hamstrings', 'Calves'],
    },
    {
      name: 'Shoulders',
      checked: false,
      muscles: ['Anterior delts', 'Lateral delts', 'Rear delts'],
    },
  ]);

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

  //closes other open accordeon when clicked on new one
  const onChange = (e) => {
    setBodyPart(
      bodyPart.map((b) => {
        return b.name === e.target.id && !b.checked
          ? { ...b, checked: true }
          : { ...b, checked: false };
      })
    );
  };

  //closes the accordeon when clicked on itself
  const onClick = (e) => {
    setBodyPart(
      bodyPart.map((b) => {
        return b.name === e.target.id && b.checked && { ...b, checked: false };
      })
    );
  };

  return (
    <>
      <Breadcrumbs index={-3} path="fromExercises" />

      <div className="my-10 w-3/4 flex justify-between">
        <div>
          <p className="text-3xl mb-8 font-bold">Body part</p>

          <div ref={musclesRef} className="form-control w-64">
            {bodyPart.map((b) => (
              <BodyPart
                onClick={onClick}
                key={b.name}
                onChange={onChange}
                checked={b.checked}
                name={b.name}
              >
                {b.muscles.map((m) => (
                  <Muscle key={m} muscle={m} />
                ))}
              </BodyPart>
            ))}
          </div>
        </div>

        <div>
          <p className="text-3xl mb-8 font-bold">Equipment</p>
          <div ref={equipRef} className="form-control">
            {equipment.map((eq) => (
              <Equipment key={eq} name={eq} />
            ))}
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
