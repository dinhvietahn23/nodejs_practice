import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Register from "./pages/register/Register";
import { AuthContext } from "./contexts/AuthContext";
import Messager from "./pages/messager/Messager";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user?<Home/>:<Register/>}/>
        <Route path="/login" element={user? <Navigate to='/'/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to = '/'/>:<Register/>}/>
        <Route path ="/message" element= {!user?<Navigate to ='/'/>:<Messager/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>

  //  <div>
  //   {/* <Profile/> */}
  //   {/* <Login/> */}
  //  </div>
  );
}

export default App;
