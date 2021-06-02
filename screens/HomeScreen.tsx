import React, { useState, Suspense, lazy } from "react";

import "../styles/HomeScreen.scss";

const Toolbar = lazy(() => import("../components/Toolbar"));
const Dashboard = lazy(() => import("../components/DashBoard"));
const SideDrawer = lazy(() => import("../components/SideDrawer"));
const BackDrop = lazy(() => import("../components/BackDrop"));
import LoadingScreen from "./LoadingScreen";

const Home = () => {
  console.log(localStorage.getItem("authenticatedUser"));
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [userSearchedResults, setUserSearchedResults] = useState(false);
  const [searchResultsSummaryString, setSearchResultsSummaryString] =
    useState("");

  const handleDrawerToggleClick: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      setSideDrawerOpen((sideDrawerOpen) => !sideDrawerOpen);
    };

  const handleBackDropToggleClick: React.MouseEventHandler<HTMLDivElement> =
    () => {
      setSideDrawerOpen(false);
    };

  const handleClickSearch: React.MouseEventHandler<HTMLDivElement> = () => {
    setUserSearchedResults(true);
    setSideDrawerOpen(false);
  };

  const clearSearchResults: React.MouseEventHandler<HTMLDivElement> = () => {
    setUserSearchedResults(false);
  };

  console.log(userSearchedResults);
  console.log(sideDrawerOpen);

  return (
    <div>
      <Suspense fallback={LoadingScreen}>
        <Toolbar drawerClickHandler={handleDrawerToggleClick} />
        <SideDrawer
          shouldShow={sideDrawerOpen}
          shouldShowSearchResults={userSearchedResults}
          handleShouldShowSearchResults={handleClickSearch}
          searchResultsSummaryString={searchResultsSummaryString}
          setSearchResultsSummaryString={setSearchResultsSummaryString}
        />
        {sideDrawerOpen ? (
          <BackDrop backDropClickHandler={handleBackDropToggleClick} />
        ) : null}
        <main>
          <Dashboard
            searchResultsSummaryString={searchResultsSummaryString}
            shouldShowSearchResults={userSearchedResults}
            clearUserSearchedResults={clearSearchResults}
          />
        </main>
      </Suspense>
    </div>
  );
};

export default Home;
