import { Outlet, Link } from "react-router-dom";
import React from 'react';
import '../css/Layout.css';
import { getActiveUser } from "../GlobalFunctions";

const Layout = () => {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/createhazard">Report Hazard</Link></li>
          <li><Link to="/hazardlist">Hazard List</Link></li>
          <li><Link to="/register">Sign up</Link></li>
          <li><Link to="/log-in" state={{ from: "occupation" }}>Log In</Link>
          </li>
          <li><div>{`Hello ${getActiveUser() ? getActiveUser().firstName : 'guest'}`}</div></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
