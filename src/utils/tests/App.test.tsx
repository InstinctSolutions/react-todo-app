import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";

it("Should render", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  expect(div.querySelector(".App")).not.toBeNull();
  ReactDOM.unmountComponentAtNode(div);
});
