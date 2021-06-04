import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

const HomeScreen = lazy(() => import("./components/HomeScreen/HomeScreen"));
const ProfileScreen = lazy(
  () => import("./components/ProfileScreen/ProfileScreen")
);
const SearchScreen = lazy(
  () => import("./components/SearchScreen/SearchScreen")
);
const EventDetailsScreen = lazy(
  () => import("./components/EventDetailsScreen/EventDetailsScreen")
);
const LoginScreen = lazy(() => import("./components/LoginScreen/LoginScreen"));

const App = (): JSX.Element => {
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
