import React, { useContext, useEffect, useState, useRef } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useUpdateData } from '../../../hooks/useUpdateData.js';
import { useAuthStatus } from '../../../hooks/useAuthStatus.js';
import ExternalEvents from './ExternalEvents';
import { v4 as uuid } from 'uuid';
import WorkoutModal from './WorkoutModal';
import WeightModal from './WeightModal';
import AddWeight from './AddWeight';
import Spinner from '../../Spinner';

function Calendar() {
  const { workouts, plannedWorkouts, dispatch, toggleCompleted, weight } =
    useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();

  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [weightModalPosition, setWeightModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const [workoutModalPosition, setWorkoutModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const [addWeightPosition, setAddWeightPosition] = useState({
    x: 0,
    y: 0,
  });
  const [eventSources, setEventSources] = useState({
    plannedWorkouts: 'plannedWorkouts',
    weight: 'weight',
  });
  const [event, setEvent] = useState({});
  const [addWeightDate, setAddWeightDate] = useState('');
  const [weightAdded, setWeightAdded] = useState(false);

  const { updatePlannedWorkouts, updateWeight } = useUpdateData();
  const fullCalendarRef = useRef(null);

  useEffect(() => {
    updatePlannedWorkouts();
  }, [plannedWorkouts, loggedIn]);
  useEffect(() => {
    updateWeight();
  }, [weight, loggedIn]);

  useEffect(() => {
    const calendar = fullCalendarRef.current?.getApi();

    if (calendar) {
      calendar.getEventSources().forEach((e) => e.remove());
      calendar.addEventSource(plannedWorkouts);
      calendar.addEventSource(weight);
    }
    setLoading(false);
  }, [plannedWorkouts, weight]);

  const handleEventReceive = (eventInfo) => {
    dispatch({
      type: 'SET_PLANNED_WORKOUTS',
      payload: {
        id: uuid(),
        title: eventInfo.draggedEl.getAttribute('title'),
        color: eventInfo.draggedEl.style.backgroundColor,
        start: eventInfo.event.start,
        allDay: true,
        completed: false,
        initialColor: eventInfo.draggedEl.style.backgroundColor,
        initialId: eventInfo.event.id,
        source: eventSources.plannedWorkouts,
      },
    });

    const calendar = fullCalendarRef.current?.getApi();
    calendar?.getEvents().forEach((e) => e.remove());
  };

  const handleEventDrop = (eventInfo) => {
    if (eventInfo.oldEvent.extendedProps.source === 'plannedWorkouts') {
      dispatch({
        type: 'SET_PLANNED_WORKOUTS',
        payload: {
          id: eventInfo.event.id,
          title: eventInfo.event.title,
          color: eventInfo.event.backgroundColor,
          start: eventInfo.event.start,
          allDay: true,
          completed: false,
          initialColor: eventInfo.event.extendedProps.initialColor,
          initialId: eventInfo.event.extendedProps.initialId,
          source: eventSources.plannedWorkouts,
        },
      });
    }
    if (eventInfo.oldEvent.extendedProps.source === 'weight') {
      dispatch({
        type: 'SET_WEIGHT',
        payload: {
          start: eventInfo.event.start,
          title: eventInfo.event.title,
          id: eventInfo.event.id,
          classNames: ['weight'],
          display: 'block',
          source: eventSources.weight,
        },
      });
    }
  };

  //change dates of events to prevent doubling
  const handleEventChange = (changeInfo) => {
    if (changeInfo.event.extendedProps.source === 'plannedWorkouts')
      dispatch({
        type: 'CHANGE_WORKOUT_DATE',
        payload: changeInfo.event.id,
      });
    if (changeInfo.event.extendedProps.source === 'weight')
      dispatch({
        type: 'CHANGE_WEIGHT_DATE',
        payload: changeInfo.event.id,
      });
  };

  const handleEventMouseEnter = (mouseEnterInfo) => {
    const rect = mouseEnterInfo.el.getBoundingClientRect();

    if (mouseEnterInfo.event.extendedProps.source === 'plannedWorkouts')
      setWorkoutModalPosition({
        x: rect.x,
        y: rect.y - rect.height * 3.1,
        width: rect.width,
      });

    if (mouseEnterInfo.event.extendedProps.source === 'weight')
      setWeightModalPosition({
        x: rect.x - 0.66 * rect.width,
        y: rect.y - rect.height * 1.8,
        width: rect.width * 2,
      });
    if (mouseEnterInfo.event.extendedProps.source === 'plannedWorkouts')
      setEvent({
        id: mouseEnterInfo.event.id,
        completed: mouseEnterInfo.event.extendedProps.completed,
        initialColor: mouseEnterInfo.event.extendedProps.initialColor,
        source: 'plannedWorkouts',
      });
    if (mouseEnterInfo.event.extendedProps.source === 'weight')
      setEvent({ id: mouseEnterInfo.event.id, source: 'weight' });
  };

  const handleEventMouseLeave = () => {
    setShowWorkoutModal(false);
    setShowWeightModal(false);
  };

  const handleEventClick = (clickInfo) => {
    clickInfo.event.extendedProps.source === 'plannedWorkouts' &&
      setShowWorkoutModal(true);
    clickInfo.event.extendedProps.source === 'weight' &&
      setShowWeightModal(true);
  };

  const onMouseOverWorkout = () => {
    setShowWorkoutModal(true);
  };
  const onMouseOverWeight = () => {
    setShowWeightModal(true);
  };

  const onMouseLeave = () => {
    setShowWorkoutModal(false);
    setShowWeightModal(false);
  };

  const onDelete = () => {
    const calendar = fullCalendarRef.current.getApi();
    if (event.source === 'plannedWorkouts') {
      calendar.getEventById(event.id).remove();
      setShowWorkoutModal(false);
      dispatch({ type: 'DELETE_PLANNED_WORKOUT', payload: event.id });
    }
    if (event.source === 'weight') {
      calendar.getEventById(event.id).remove();
      setShowWeightModal(false);
      dispatch({ type: 'DELETE_WEIGHT', payload: event.id });
    }
  };

  const toggleComplete = (event) => {
    toggleCompleted(event);
    setEvent({
      ...event,
      completed: !event.completed,
    });
  };

  const handleDateClick = (info) => {
    setShowAddWeight(true);
    const rect = info.dayEl.getBoundingClientRect();
    setAddWeightPosition({
      x: rect.x + 0.1 * rect.width,
      y: rect.y + 0.7 * rect.height,
      width: 0.8 * rect.width,
    });
    setAddWeightDate(info.date);
    setWeightAdded(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div
        onClick={() =>
          dispatch({
            type: 'CLEAR_PLANNED_WORKOUTS',
          })
        }
        className="btn btn-secondary"
      >
        CLEAR PLANNED WORKOUTS
      </div>

      {showWorkoutModal && (
        <WorkoutModal
          position={workoutModalPosition}
          onMouseOver={onMouseOverWorkout}
          onMouseLeave={onMouseLeave}
          onDelete={onDelete}
          setComplete={() => toggleComplete(event)}
          eventCompleted={event.completed}
        />
      )}
      {showWeightModal && (
        <WeightModal
          position={weightModalPosition}
          onMouseOver={onMouseOverWeight}
          onMouseLeave={onMouseLeave}
          onDelete={onDelete}
        />
      )}
      {showAddWeight && (
        <AddWeight
          position={addWeightPosition}
          date={addWeightDate}
          weightAdded={weightAdded}
          setWeightAdded={(e) => setWeightAdded(e)}
          source={eventSources.weight}
        />
      )}
      <div className="grid grid-cols-5 gap-y-2 mb-5" id="external-events">
        {workouts &&
          workouts.map((workout, index) => (
            <ExternalEvents key={workout.id} index={index} workout={workout} />
          ))}
      </div>
      <FullCalendar
        ref={fullCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        droppable
        editable
        eventTextColor="rgb(51, 60, 77)"
        eventSources={[plannedWorkouts, weight]}
        eventReceive={handleEventReceive}
        eventDrop={handleEventDrop}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        dateClick={handleDateClick}
      />
    </>
  );
}

export default Calendar;
