import "./styles/App.css";
import "./styles/utilities.css";
import "./styles/colors.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import SingleView from "./pages/SingleView";
import NavBar from "./components/ui/structure/NavBar";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar username={"Taha"} />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/singleView" element={<SingleView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
