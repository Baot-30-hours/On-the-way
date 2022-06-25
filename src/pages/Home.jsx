import React from 'react'
import { Button } from 'semantic-ui-react'
import "../css/App.css";
import '../css/Home.css';
import { useNavigate } from "react-router-dom";
import SimpleMap from "./GoogleMap";

export default function Home() {
  var url = "https://www.waze.com/he/live-map&output=embed";
  var userName = "Israel Israeli";

  const navigate = useNavigate();

  const handleClick1 = () => {
    window.open("https://www5.tel-aviv.gov.il/TlvForms/106plus/");
  };

  const handleClick2 = () => {
    navigate("CreateHazard/");
  };

  return (
    <div className="container App">
      <header className="app-header">
        <p>Hello {userName}</p>
      </header>
      <div className="func-buttons ui three column centered grid">
        <div className="three column centered row">
          <Button color='orange' className="msg-btn" onClick={handleClick1}>Message for hotline</Button>
          <Button color='olive' className="new-btn" onClick={handleClick2}>Create Hazard</Button>
          <Button color='yellow' className="mail-btn">My messages</Button>
        </div>
      </div>
      {/* <SimpleMap /> */}
      {/* <iframe className="live-map" src="https://www5.tel-aviv.gov.il/TlvForms/106plus/" width={1000} height={500} ></iframe> */}
    </div>
  );
}

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Home />);
//