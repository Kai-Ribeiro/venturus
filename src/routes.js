import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import TeamForm from './pages/Team/Form';
export default function Routes() {

  return (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/create" component={TeamForm} exact/>
  </Switch>

  );

}
