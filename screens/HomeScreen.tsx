import React from "react";

import "../styles/HomeScreen.scss";
import Navbar from "../components/Navbar";
import Dashboard from "../components/DashBoard";
//import { store } from "../store/store";

const Home = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
};

export default Home;
