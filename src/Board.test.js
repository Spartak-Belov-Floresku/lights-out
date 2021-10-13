import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("renders without crashing", function() {
  render(<Board  nrows={3} ncols={3} chanceLightStartsOn={2}/>);
});

it("matches snapshot", function() {
    const {asFragment} = render(<Board  nrows={2} ncols={2} chanceLightStartsOn={11}/>);
    expect(asFragment()).toMatchSnapshot();
});
