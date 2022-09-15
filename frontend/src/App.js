import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FileUpload from "./Components/FileUpload";

import Login from "./Components/Login";

function App() {
  const token = localStorage.getItem("access_token");
  console.log(token);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? <FileUpload /> : <Navigate to="/authenticate" replace />
            }
          />
          <Route
            path="/authenticate"
            element={token ? <Navigate to="/" replace /> : <Login />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
