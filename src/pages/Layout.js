import { Outlet, NavLink } from "react-router-dom";
import React from 'react';
import '../css/Layout.css';

const Layout = ({user}) => {

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "green" : "black",
              };
            }} to="/register"><b>Sign up</b></NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "green" : "black",
              };
            }} to="/log-in"><b>Log In</b></NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "green" : "black",
              };
            }} to="/"><b>Home</b></NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "green" : "black",
              };
            }} to="/createhazard"><b>Report Hazard</b></NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "green" : "black",
              };
            }} to="/hazardlist"><b>Hazard List</b></NavLink>
          </li>
          <li>
            <h3 style={{
                display: "block",
                margin: "1rem 0"
              }}>{`Hello ${user}`}</h3>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
