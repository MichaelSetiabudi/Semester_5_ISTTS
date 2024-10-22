import React, { useState } from "react";

function EditEmployee({ employeetoUpdate, setEmployees, employees, setRoute }) {
  const [name, setName] = useState(employeetoUpdate?.name || "");
  const [id, setId] = useState(employeetoUpdate?.id || "");
  const [email, setEmail] = useState(employeetoUpdate?.email || "");
  const [division, setDivision] = useState(employeetoUpdate?.division || "");
  const [error, setError] = useState("");

  const handleEditEmployee = () => {
    if (!division) {
      setError("Please select a division.");
      return;
    }

    const updatedEmployee = {
      ...employeetoUpdate,
      name,
      email,
      division,
    };

    const updatedEmployees = employees.map((emp) =>
      emp.id === employeetoUpdate.id ? updatedEmployee : emp
    );

    setEmployees(updatedEmployees); 
    setRoute("home");
  };

  return (
    <div
      className="container-fluid"
      style={{ paddingLeft: "3vw", paddingTop: "3vh" }}
    >
      <h1>
        <b>Edit Employee</b>
      </h1>
      <div className="p-0 m-0" style={{fontWeight:"700"}}>
        <p>ID: {id}</p> {/* Display the employee's ID */}
      </div>
      <div className="container-fluid p-0 m-0" >
        <div style={{ marginBottom: "1rem" }}>
          <input
            style={{
              width: "25%",
              borderRadius: "5px",
              borderWidth: "3px",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight:"700"
            }}
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            style={{
              width: "25%",
              borderRadius: "5px",
              borderWidth: "3px",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight:"700"
            }}
            type="text"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <select
            style={{
              width: "25%",
              borderRadius: "5px",
              borderWidth: "3px",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight:"700"
            }}
            name="Division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
          >
            <option value="" disabled>
              Division
            </option>
            <option value="Admin">Admin</option>
            <option value="Operation">Operation</option>
            <option value="Engineer">Engineer</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginBottom: "1rem" }}>
          <button
            style={{
              width: "25%",
              borderRadius: "8px",
              borderWidth: "3px",
              padding: "1rem",
              margin: "0",
              fontSize: "1rem",
              fontWeight: "800",
              backgroundColor: "#cfcfcf",
            }}
            onClick={handleEditEmployee}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
