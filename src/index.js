import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Route component={App} />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
