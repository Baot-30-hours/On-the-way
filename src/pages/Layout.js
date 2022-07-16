import { Outlet, Link } from "react-router-dom";
import React from 'react';
import '../css/Layout.css';

const Layout = ({user}) => {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/register">Sign up</Link></li>
          <li><Link to="/log-in" state={{ from: "occupation" }}>Log In</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/createhazard">Report Hazard</Link></li>
          <li><Link to="/hazardlist">Hazard List</Link></li>
          <li><div>{`Hello ${user}`}</div></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
