import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Footer from './components/Footer';

import './App.css';
import './SelectSearch.css';
import 'bulma/css/bulma.css';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/detail/:id' component={withRouter(MovieDetail)} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
