import React from "react";
import renderer from "react-test-renderer";
import Table from "./Table";

test("renders correctly", () => {
  const data = [];
  const table = renderer.create(<Table data={data} />).toJSON();
  expect(table).toMatchSnapshot();
});
