import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

it("renders without crashing", function() {
  render(<table><tbody><tr><Cell flipCellsAroundMe={() => (`0-0`)} isLit={true}/></tr></tbody></table>);
});

it("matches snapshot", function() {
    const {asFragment} = render(<table><tbody><tr><Cell flipCellsAroundMe={() => (`0-0`)} isLit={true}/></tr></tbody></table>);
    expect(asFragment()).toMatchSnapshot();
  });