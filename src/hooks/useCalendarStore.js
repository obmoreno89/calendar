import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { converEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendatEvent) => {
    try {
      if (calendatEvent.id) {
        const { data } = await calendarApi.put(
          `/events/${calendatEvent.id}`,
          calendatEvent
        );
        dispatch(onUpdateEvent({ ...calendatEvent, user }));
        return;
      }
      const { data } = await calendarApi.post('/events', calendatEvent);
      console.log({ data });
      dispatch(onAddNewEvent({ ...calendatEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = converEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
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
