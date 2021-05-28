import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/HomeScreen.scss";
import Toolbar from "../components/Toolbar";
import Dashboard from "../components/DashBoard";
import SideDrawer from "../components/SideDrawer";
import BackDrop from "../components/BackDrop";

const Home = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [userSearchedResults, setUserSearchedResults] = useState(false);

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
    <>
      <Toolbar drawerClickHandler={handleDrawerToggleClick} />
      <SideDrawer
        shouldShow={sideDrawerOpen}
        shouldShowSearchResults={userSearchedResults}
        handleShouldShowSearchResults={handleClickSearch}
      />
      {sideDrawerOpen ? (
        <BackDrop backDropClickHandler={handleBackDropToggleClick} />
      ) : null}
      <main>
        <Dashboard
          shouldShowSearchResults={userSearchedResults}
          clearUserSearchedResults={clearSearchResults}
        />
      </main>
    </>
  );
};

export default Home;
