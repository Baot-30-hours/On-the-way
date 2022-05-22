import "../css/App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";

import CreateNotification from "./CreateNotification";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="createnotification" element={<CreateNotification />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <>
    <CreateNotification/>
  </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
