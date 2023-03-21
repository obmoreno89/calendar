import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendatEvent) => {
    if (calendatEvent._id) {
      dispatch(onUpdateEvent({ ...calendatEvent }));
    } else {
      dispatch(onAddNewEvent({ ...calendatEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    hasEventSelected: !!activeEvent,
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
