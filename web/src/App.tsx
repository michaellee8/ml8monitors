import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Monitor } from "./features/monitor/Monitor";

function App() {
  return (
    <div className="App">
      <Monitor />
    </div>
  );
}

export default App;
