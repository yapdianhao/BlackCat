import React, { useState } from "react";

import "../styles/HomeScreen.scss";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Dashboard from "../components/DashBoard";
import SideDrawer from "../components/SideDrawer";
import BackDrop from "../components/BackDrop";
import { Event } from "../server/model/event";
//import { store } from "../store/store";

const Home = () => {
  const [eventPosts, setEventPosts] = useState<Event[]>([]);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(true);

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
      <SideDrawer shouldShow={sideDrawerOpen} />
      {sideDrawerOpen ? (
        <BackDrop backDropClickHandler={handleBackDropToggleClick} />
      ) : null}
      <Dashboard state={eventPosts} setState={setEventPosts} />
    </>
  );
};

export default Home;
