import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Home from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={ProfileScreen} />
        <Route path="/home" component={Home} />
        <Route path="/search" component={SearchScreen} />
        <Route path="/events/:id" component={EventDetailsScreen} />
        <Route exact path="/" component={LoginScreen} />
      </Switch>
    </Router>
  );
};

export default App;
