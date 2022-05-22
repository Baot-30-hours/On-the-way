import "../css/App.css";
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import CreateHazard from "./CreateHazard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="createhazard" element={<CreateHazard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}