import React from "react";
import { useState } from "react";

import Toolbar from "../Toolbar/Toolbar";

const SearchScreen = (): JSX.Element => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <div>
      <Toolbar drawerClickHandler={() => setSideDrawerOpen(!sideDrawerOpen)} />
    </div>
  );
};

export default SearchScreen;
