import React, { useContext, useEffect, useState, useRef } from 'react';
import ExercisesContext from '../../../context/ExercisesContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useUpdateData } from '../../../hooks/useUpdateData.js';
import { useAuthStatus } from '../../../hooks/useAuthStatus.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { getAuth } from 'firebase/auth';
import ExternalEvents from './ExternalEvents';

function Calendar() {
  const { workouts, plannedWorkouts, dispatch } = useContext(ExercisesContext);
  const { loggedIn } = useAuthStatus();
  const auth = getAuth();
  const { updatePlannedWorkouts } = useUpdateData();

  const fullCalendarRef = useRef(null);

  useEffect(() => {
    updatePlannedWorkouts();
  }, [plannedWorkouts, loggedIn]);

  useEffect(() => {
    const calendar = fullCalendarRef.current.getApi();
    calendar.getEvents().forEach((e) => e.remove());

    calendar
      .getEventSources()
      .forEach((s) =>
        s.internalEventSource.meta.length === 0 ? s.remove() : s
      );
    calendar.addEventSource(plannedWorkouts);
  }, [plannedWorkouts]);

  const handleEventReceive = (eventInfo) => {
    dispatch({
      type: 'SET_PLANNED_WORKOUTS',
      payload: {
        id: eventInfo.draggedEl.getAttribute('id'),
        title: eventInfo.draggedEl.getAttribute('title'),
        color: eventInfo.draggedEl.style.backgroundColor,
        start: eventInfo.event.start,
        allDay: true,
      },
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
        eventSources={plannedWorkouts && plannedWorkouts}
        eventReceive={handleEventReceive}
      />
    </>
  );
}

export default Calendar;
