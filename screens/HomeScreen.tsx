import React, { useState } from "react";

import "../styles/HomeScreen.scss";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Dashboard from "../components/DashBoard";
import SideDrawer from "../components/SideDrawer";
import BackDrop from "../components/BackDrop";
//import { store } from "../store/store";

const Home = () => {
  // const [eventPosts, setEventPosts] = useState<Event[]>([]);
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

  return (
    <>
      <Toolbar drawerClickHandler={handleDrawerToggleClick} />
      <SideDrawer
        shouldShow={sideDrawerOpen}
        shouldShowSearchResults={setUserSearchedResults}
      />
      {sideDrawerOpen ? (
        <BackDrop backDropClickHandler={handleBackDropToggleClick} />
      ) : null}
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default Home;
