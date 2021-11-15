import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThroughProvider } from "react-through";

import "./index.css";
import { App } from "./App";

// setup fake backend
import { fakeBackend } from "@iso/helpers";
fakeBackend();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThroughProvider>
        <App />
      </ThroughProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("app")
);
