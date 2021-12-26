import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes,
  } from "react-router-dom";
import  Login from './Components/UnAuthenticated/Login'
import  Signup from './Components/UnAuthenticated/Signup'
import Profile  from './Components/Authenticated/Profile';

const createRoutes = () => (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile />}
        ></Route>
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
);

export default createRoutes;