import React from "react";

import "../styles/HomeScreen.scss";

interface HomeProps {}

const getToken = () => {
  const userTokenString = localStorage.getItem("token");
  const userToken = JSON.parse(userTokenString);
  return userToken?.token;
};

const Home = () => {
  console.log(getToken());
  return <div>Home</div>;
};

export default Home;
