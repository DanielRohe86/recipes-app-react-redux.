import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Meal from './pages/Meal';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route
            exact
            path="/meal"
            render={ (props) => <Meal { ...props } /> }
          />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
