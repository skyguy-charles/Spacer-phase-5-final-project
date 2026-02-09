import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import App from './App.jsx';
import './main.css';

// dispatch initial data loads
import { fetchSpaces } from './redux/spacesSlice';
import { fetchBookings } from './redux/bookingsSlice';
import { fetchUsers } from './redux/usersSlice';

store.dispatch(fetchSpaces());
store.dispatch(fetchBookings());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);