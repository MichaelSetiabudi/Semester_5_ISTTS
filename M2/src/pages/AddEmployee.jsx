import React, { useState } from "react";

function AddEmployee({ employees, setEmployees,setRoute}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");
  const [error, setError] = useState("");

  const nextEmployeeId = `EMPL${(employees.length + 1)
    .toString()
    .padStart(3, "0")}`;

  const handleAddEmployee = () => {
    if (!division) {
      setError("Please select a division.");
      return; 
    }

    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
    
    const newEmployee = {
      id: nextEmployeeId,
      name,
      email,
      division,
      date: formattedDate,
    };

    setEmployees([...employees, newEmployee]);
    setRoute("home");
    setName("");
    setEmail("");
    setDivision("");
    setError(""); 
  };

  return (
    <div
      className="container-fluid"
      style={{ paddingLeft: "3vw", paddingTop: "3vh" }}
    >
      <h1>
        <b>Add Employee</b>
      </h1>
      <div className="p-0 m-0">
        <p>ID: {nextEmployeeId}</p>
      </div>
      <div className="container-fluid p-0 m-0">
        <div style={{ marginBottom: "1rem" }}>
          <input
            style={{
              width: "25%",
              borderRadius: "5px",
              borderWidth: "3px",
              padding: "1rem",
              fontSize: "1rem",
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
            onClick={handleAddEmployee}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
