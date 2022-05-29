import { Outlet, Link } from "react-router-dom";

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
            <Link to="/register">Sign in</Link>
          </li>
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
