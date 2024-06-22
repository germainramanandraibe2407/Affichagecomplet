
import './Leaderboard.css'; // Import the CSS file for styling
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import Rank from './Rank';
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";


const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <div className="body">
      <Rank/>
      <App />
    </div>
);
