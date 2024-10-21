import React, { useState } from "react";
import AddEmployee from "./pages/AddEmployee";
import ListEmployee from "./pages/ListEmployee";

function Nav({ handleNavbarClick }) {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#627D98", padding: "1rem 0" }}
    >
      <div className="container-fluid d-flex">
        <div
          className="container-fluid"
          style={{ marginLeft: "3rem", width: "auto", color: "white" }}
        >
          <h1>EMPLOYEE</h1>
        </div>
        <div
          className="container-fluid d-flex"
          style={{
            paddingLeft: "5rem",
            gap: "5rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <a
            href="#"
            style={{ color: "white", fontSize: "1.5rem" }}
            onClick={() => handleNavbarClick('home')}
          >
            List
          </a>
          <a
            href="#"
            onClick={() => handleNavbarClick('addEmployee')}
            style={{
              color: "white",
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            Add
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState('home');
  const [listemployees, setEmployees] = useState([]);

  const handleNavbarClick = (page) => {
    setRoute(page);
  };

  return (
    <>
      <Nav handleNavbarClick={handleNavbarClick} />
      <div className="content">
        {route === 'home' && <ListEmployee employees={listemployees} />}
        {route === 'addEmployee' && <AddEmployee setEmployees={setEmployees} employees={listemployees} setRoute={setRoute} />}
      </div>
    </>
  );
}

export default App;
