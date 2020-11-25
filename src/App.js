import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

import './App.css';
import './SelectSearch.css';
import 'bulma/css/bulma.css';

import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/Signin' component={Signin} />
          <Route path='/detail/:id' component={withRouter(MovieDetail)} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div> 
    </AuthProvider>
  );
}

export default App;
