import "../css/App.css";
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import CreateHazard from "./CreateHazard";
import CreateUser from "./Register";
import HazardList from "./HazardList";
import BackendTest from "./BackendTest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="createhazard" element={<CreateHazard />} />
          <Route path="hazardlist" element={<HazardList />} />
          <Route path="register" element={<CreateUser />} />
          <Route path="backendtest" element={<BackendTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
