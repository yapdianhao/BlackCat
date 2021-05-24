import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import SearchScreen from "../screens/SearchScreen";
import About from "../components/About";
import Home from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route path="/search" component={SearchScreen} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
