import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { converEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendatEvent) => {
    if (calendatEvent._id) {
      dispatch(onUpdateEvent({ ...calendatEvent }));
    } else {
      const { data } = await calendarApi.post('/events', calendatEvent);
      console.log({ data });
      dispatch(onAddNewEvent({ ...calendatEvent, id: data.evento.id, user }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = converEventsToDateEvents(data.eventos);
      console.log(events);
    } catch (error) {
      console.log('error cargando eventos');
    }
  };

  return {
    hasEventSelected: !!activeEvent,
    events,
    activeEvent,
    setActiveEvent,

    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
