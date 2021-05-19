import React from "react";

import "../styles/HomeScreen.scss";
import { store } from "../store/store";

const Home = () => {
  console.log(store.getState());
  return <div>Home</div>;
};

export default Home;
