import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import "../styles/HomeScreen.scss";
import { User } from "../server/model/user";
import Toolbar from "../components/Toolbar";
import Dashboard from "../components/DashBoard";
import SideDrawer from "../components/SideDrawer";
import BackDrop from "../components/BackDrop";

const Home = () => {
  console.log(localStorage.getItem("authenticatedUser"));
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [userSearchedResults, setUserSearchedResults] = useState(false);
  const [authenticatedUserId, setAuthenticatedUserId] = useState("");

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

  // useEffect(() => {
  //   setAuthenticatedUserId(localStorage.getItem("authenticatedUser"));
  // });

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
