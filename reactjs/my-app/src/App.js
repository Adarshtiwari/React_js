import logo from "./logo.svg";
import "./App.css";
import Home from "./Containers/HomeContainer";
import Header from "./Containers/HeaderContainer";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import User from "./Components/User";
import AutoComplete from "./Components/place";
import TestJob from "./Components/test";

function App() {
  return (
    <div className="App">
      {/* <Header></Header> */}

      <BrowserRouter>
        <Link to="/home">Home</Link>
        <br></br>
        <Link to="/user/anil">anil</Link>
        <br></br>
        <Link to="/user/barkha">barkha</Link>
        <br></br>
        <Routes>
          <Route path="/" element={<TestJob />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/:name" element={<User></User>}></Route>
          <Route path="/*" element={<Navigate to="/home"></Navigate>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
