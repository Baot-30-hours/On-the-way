import "../css/App.css";
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import CreateHazard from "./CreateHazard";
import CreateUser from "./Register";
import HazardList from "./HazardList";
import BackendTest from "./BackendTest";
import RegisterOptimize from "./RegisterOptimize";
import FetchData from "./NewBoard"
export default function App() {
  // Google Maps Platform API Key
  // AIzaSyBtUSAW7ssnBNngTj4Q7X076cyRoCHtd94
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="createhazard" element={<CreateHazard />} />
          <Route path="hazardlist" element={<HazardList />} />
          <Route path="register" element={<CreateUser />} />
          <Route path="log-in" element={<RegisterOptimize type="log in" />} />
          <Route path="sign-up" element={<RegisterOptimize type="sign up" />} />
          <Route path="backendtest" element={<BackendTest />} />
          <Route path="newsboard" element={<FetchData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
