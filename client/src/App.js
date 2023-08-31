import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useSelector } from "react-redux";
import Video from './pages/Video';
import Upload from './components/Upload';
const App = () => {
  const currentUser = useSelector((state) => state.userreducer.currentUser);

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="random" element={<Home />} />
        <Route path="search" element={<Home />} />


        <Route  path="signin"  element={  <Login />}/>
        <Route path="signup"element={<SignUp />}/>
        <Route path="/videos/find/:id" element={<Video />}/>

        <Route path="/" element={<Upload />}/>
       
      </Routes>
    </Router>
  );
};

export default App;