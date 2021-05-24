import React from "react";
import { useState } from "react";

import Toolbar from "../components/Toolbar";

const SearchScreen = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <div>
      <Toolbar drawerClickHandler={() => setSideDrawerOpen(!sideDrawerOpen)} />
    </div>
  );
};

export default SearchScreen;
