import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { store } from './store';

function CalendarApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default CalendarApp;
