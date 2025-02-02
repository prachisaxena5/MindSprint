import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./Components/Quiz";
const API_URL = "/api/Uw5CrX";

const App = () => {
  const [darkmode, setDarkMode] = useState(false);
  const togglecolor = () => {
    document.body.style.backgroundColor = darkmode ? "white" : "black";
    document.body.style.color = darkmode ? "black" : "white";
    setDarkMode(!darkmode);
  };
  return (
    <Router>
      <div className="toggle-mode" onClick={togglecolor}>
        <i
          className={
            darkmode ? "ri-sun-line large-icon" : "ri-moon-line large-icon"
          }
        ></i>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Navbar darkmode={darkmode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/Quiz"
          element={
            <Quiz
              API_URL={API_URL}
              darkmode={darkmode}
              setDarkMode={setDarkMode}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
