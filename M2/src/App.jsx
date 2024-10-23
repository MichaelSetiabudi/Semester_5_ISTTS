import React, { useState } from "react";
import AddEmployee from "./pages/AddEmployee";
import ListEmployee from "./pages/ListEmployee";
import EditEmployee from "./pages/EditEmployee"; 

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
            style={{ color: "white", fontSize: "1.5rem", textDecoration:"none"}}
            onClick={() => handleNavbarClick("home")}
          >
            List
          </a>
          <a
            href="#"
            onClick={() => handleNavbarClick("addEmployee")}
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
  const [route, setRoute] = useState("home"); 
  const [employees, setEmployees] = useState([]); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const handleNavbarClick = (page) => {
    setRoute(page);
  };

  return (
    <>
      <Nav handleNavbarClick={handleNavbarClick} />
      <div className="content" style={{ padding: "2rem" }}>
        {route === "home" && (
          <ListEmployee
            employees={employees}
            setEmployees={setEmployees}
            setRoute={setRoute} 
            setSelectedEmployee={setSelectedEmployee}
          />
        )}
        {route === "addEmployee" && (
          <AddEmployee
            employees={employees}
            setEmployees={setEmployees}
            setRoute={setRoute}
          />
        )}
        {route === "edit" && selectedEmployee && (
          <EditEmployee
            employeetoUpdate={selectedEmployee}
            setEmployees={setEmployees}
            employees={employees}
            setRoute={setRoute}
          />
        )}
      </div>
    </>
  );
}

export default App;
