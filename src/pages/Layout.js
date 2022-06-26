import { Outlet, Link } from "react-router-dom";
import '../css/Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createhazard">Create Hazard</Link>
          </li>
          <li>
            <Link to="/hazardlist">Hazard List</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
          <li>
            <Link to="/log-in">Log In</Link>
          </li>
          {/* <li>
            <Link to="/sign-up">Sign Up</Link>
          </li> */}
          <li>
            <Link to="/backendtest">Backend Test</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
