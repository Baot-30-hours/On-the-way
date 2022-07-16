import "../css/App.css";
//import ReactDOM from "react-dom/client";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import CreateHazard from "./CreateHazard";
import CreateUser from "./Register";
import HazardList from "./HazardList";
import BackendTest from "./BackendTest";
import LogIn from "./LogIn";
import FetchData from "./NewBoard";
import HazardDetails from "./HazardDetails";

export default function App() {

  // Google Maps Platform API Key
  // AIzaSyBtUSAW7ssnBNngTj4Q7X076cyRoCHtd94

  const [user,setUser] = useState('guest')
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout user={user}/>}>
          <Route index element={<Home />} />
          <Route path="createhazard" element={<CreateHazard />} />
          <Route path="hazardlist" element={<HazardList />} />
          <Route path="hazarddetails" element={<HazardDetails />} />
          <Route path="register" element={<CreateUser />} />
          <Route path="log-in" element={<LogIn setUser={setUser}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
