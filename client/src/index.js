import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { store } from './reducers';
import { Provider } from 'react-redux'
import './style.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
