import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import './App.css';

// components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const setAuth = (isAuth) => {
    setIsAuthenticated(isAuth);
  };

  useEffect(() => {
    const isAuth = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auth/is-verify`,
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );

        if (response.status === 200 && response.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    isAuth();
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Register {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
