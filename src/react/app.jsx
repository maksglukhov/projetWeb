import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./components/Menu";

const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <main>
    <Menu></Menu>
  </main>
);
