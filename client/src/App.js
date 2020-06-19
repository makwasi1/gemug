import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Landing from "./Components/Layout/Landing";
import NavBar from "./Components/Layout/NavBar";
import Register from "./Components/auth/Register"
import Login from "./Components/auth/Login"

export default function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
       <Route exact path="/" component={Landing} />
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}
