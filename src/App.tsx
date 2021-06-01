import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import LoadingScreen from "../screens/LoadingScreen";

const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const ProfileScreen = lazy(() => import("../screens/ProfileScreen"));
const SearchScreen = lazy(() => import("../screens/SearchScreen"));
const EventDetailsScreen = lazy(() => import("../screens/EventDetailsScreen"));
const LoginScreen = lazy(() => import("../screens/LoginScreen"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={LoadingScreen}>
        <Switch>
          <Route path="/about" component={ProfileScreen} />
          <Route path="/home" component={HomeScreen} />
          <Route path="/search" component={SearchScreen} />
          <Route path="/events/:id" component={EventDetailsScreen} />
          <Route exact path="/" component={LoginScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
