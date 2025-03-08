import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/home";
import Signup from "./Pages/Login/signup";
import Login from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import Profile from "./Pages/Profile/profile";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
