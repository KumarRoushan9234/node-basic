import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UserDetails from './components/UserDetails';
import Reset from './components/auth/Reset';

const App = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={isLoggedIn === "true"?<UserDetails/> : <Login/>} />
          <Route path="/userDetail" element={<UserDetails/>}/>
          <Route path="/reset" element={<Reset/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
