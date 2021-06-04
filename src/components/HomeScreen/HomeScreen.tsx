import React, { useState, Suspense, lazy } from "react";

//import homeScreenClass from "../styles/HomeScreen.module.scss";

const Toolbar = lazy(() => import("../Toolbar/Toolbar"));
const Dashboard = lazy(() => import("../DashBoard/DashBoard"));
const SideDrawer = lazy(() => import("../SideDrawer/SideDrawer"));
const BackDrop = lazy(() => import("../BackDrop/BackDrop"));
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Home = (): JSX.Element => {
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

  console.log("rerender homescreen");

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
