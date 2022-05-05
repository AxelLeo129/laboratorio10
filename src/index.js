import React from "react";
import { createRoot } from "react-dom/client";
import StartApp from './components/startApp';
import './index.css';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StartApp />
  </React.StrictMode>
);
