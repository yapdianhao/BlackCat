import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Counter from "../components/Counter";
import About from "../components/About";
import Home from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import EventCard from "../components/EventCard";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route exact path="/" component={EventCard} />
      </Switch>
    </Router>
  );
};

export default App;
