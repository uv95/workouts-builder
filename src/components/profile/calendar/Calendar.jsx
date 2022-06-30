import React, { useContext, useEffect, useState, useRef } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useUpdateData } from '../../../hooks/useUpdateData.js';
import { useAuthStatus } from '../../../hooks/useAuthStatus.js';
import ExternalEvents from './ExternalEvents';
import { v4 as uuid } from 'uuid';
import Modal from './Modal';

function Calendar() {
  const { workouts, plannedWorkouts, dispatch, toggleCompleted } =
    useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [event, setEvent] = useState({ id: '', completed: false });
  const { updatePlannedWorkouts } = useUpdateData();
  const fullCalendarRef = useRef(null);

  useEffect(() => {
    updatePlannedWorkouts();
  }, [plannedWorkouts, loggedIn]);

  useEffect(() => {
    const calendar = fullCalendarRef.current.getApi();
    calendar.getEvents().forEach((e) => e.remove());
    calendar.addEventSource(plannedWorkouts);
  }, [plannedWorkouts]);

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
      },
    });
  };

  const handleEventDrop = (eventInfo) => {
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
      },
    });
  };

  const handleEventChange = (changeInfo) => {
    dispatch({
      type: 'CHANGE_WORKOUT_DATE',
      payload: changeInfo.event.id,
    });
  };
  const handleEventMouseEnter = (mouseEnterInfo) => {
    const rect = mouseEnterInfo.el.getBoundingClientRect();
    setPosition({
      x: rect.x,
      y: rect.y - rect.height * 3.3,
      width: rect.width,
    });
    setEvent({
      id: mouseEnterInfo.event.id,
      completed: mouseEnterInfo.event.extendedProps.completed,
      initialColor: mouseEnterInfo.event.extendedProps.initialColor,
    });
  };
  const handleEventMouseLeave = () => {
    setShowModal(false);
  };

  const handleEventClick = () => {
    setShowModal(true);
  };

  const onMouseOver = () => {
    setShowModal(true);
  };
  const onMouseLeave = () => {
    setShowModal(false);
  };

  const onDelete = () => {
    const calendar = fullCalendarRef.current.getApi();
    calendar.getEventById(event.id).remove();
    setShowModal(false);
    dispatch({ type: 'DELETE_PLANNED_WORKOUT', payload: event.id });
  };
  const toggleComplete = (event) => {
    toggleCompleted(event);
    setEvent({
      ...event,
      completed: !event.completed,
    });
  };

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
      <Modal
        position={position}
        showModal={showModal}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onDelete={onDelete}
        setComplete={() => toggleComplete(event)}
        eventCompleted={event.completed}
      />
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
        eventSources={plannedWorkouts && plannedWorkouts}
        eventReceive={handleEventReceive}
        eventDrop={handleEventDrop}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
      />
    </>
  );
}

export default Calendar;
