import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail';

import './App.css';
import 'bulma/css/bulma.css';
import { NotFound } from './pages/NotFound';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/detail/:id' component={MovieDetail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
