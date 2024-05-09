import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import the Provider component from react-redux
import store from './store'; // Import the Redux store you created

import App from './App'; // Import your root React component

// Render the React application
ReactDOM.render(
  // Wrap the App component with the Provider component
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // Render the application in the DOM element with the id 'root'
);