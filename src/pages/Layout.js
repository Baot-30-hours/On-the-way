import { Link, Outlet, NavLink } from "react-router-dom";
import React from 'react';
import '../css/Layout.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

const Layout = ({user}) => {
  const maybe_disabled = user != 'guest' ? '' : 'disabled';
  return (
    <>
      <nav>
        <ul>
          <li><img src="OnTheWayLogo.jpeg" className="logo-img"/></li>
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
          <IconButton onClick={<Link to="/userprofile"></Link>} >
                <Avatar alt={`${user}`} src="/static/images/avatar/2.jpg" />
              </IconButton>
              { user === 'guest' ?  `hello ${user}` : 
             <NavLink to="/userprofile" >{`hello ${user}`}</NavLink>}
          {/* <NavLink to="/userprofile" maybe_disabled >{`Hello ${user}`}</NavLink> */}
            </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
