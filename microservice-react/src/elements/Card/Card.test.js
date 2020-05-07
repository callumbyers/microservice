import React from "react";
import renderer from "react-test-renderer";
import Card from "./Card";

test("renders correctly", () => {
  const card = renderer.create(<Card />).toJSON();
  expect(card).toMatchSnapshot();
});
