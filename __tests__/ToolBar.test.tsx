import React from "react";
import renderer from "react-test-renderer";

import Toolbar from "../components/Toolbar";

it("renders Toolbar correctly", () => {
  const drawerClickHandler = () => console.log(true);
  const tree = renderer
    .create(<Toolbar drawerClickHandler={drawerClickHandler} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
