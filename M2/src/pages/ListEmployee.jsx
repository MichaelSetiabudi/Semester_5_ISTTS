/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function ListEmployee({ employees }) {
  const [selectedDivision, setSelectedDivision] = useState("All"); // State untuk menyimpan divisi yang dipilih
  const [employeeList, setEmployeeList] = useState(employees); // State untuk daftar karyawan
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // State untuk menyimpan karyawan yang akan dihapus

  const getBackgroundColor = (division) => {
    switch (division) {
      case "Operation":
        return "#ff6161";
      case "Engineer":
        return "#ffb061";
      case "Admin":
        return "#ffdf61";
      default:
        return "#fff";
    }
  };

  // Filter employees berdasarkan divisi yang dipilih
  const filteredEmployees =
    selectedDivision === "All"
      ? employeeList
      : employeeList.filter(
          (employee) => employee.division === selectedDivision
        );

  // Fungsi untuk membuka modal delete
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowModal(true);
  };

  // Fungsi untuk menghapus employee dari list
  const confirmDelete = () => {
    setEmployeeList((prevList) =>
      prevList.filter((employee) => employee.id !== employeeToDelete.id)
    );
    setShowModal(false); // Tutup modal setelah delete
    setEmployeeToDelete(null); // Reset employeeToDelete setelah delete
  };

  // Fungsi untuk menutup modal tanpa menghapus
  const closeModal = () => {
    setShowModal(false);
    setEmployeeToDelete(null);
  };

  return (
    <>
      <div
        className="container-fluid d-flex"
        style={{
          paddingLeft: "4vw",
          margin: "0",
          paddingTop: "2vh",
          paddingBottom: "2vh",
          flexWrap: "wrap", // Allow buttons to wrap on smaller screens
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedDivision("All")} // Mengatur filter menjadi "All"
          style={{
            backgroundColor: "#cdcdcd",
            border: "none",
            padding: "0.5rem 4rem",
            marginRight: "1vw",
            marginBottom: "1vh",
            borderRadius: "5px",
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "600",
            flex: "1", // Allows buttons to resize based on available space
            maxWidth: "250px",
          }}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setSelectedDivision("Operation")} // Mengatur filter menjadi "Operation"
          style={{
            backgroundColor: "#ff6161",
            border: "none",
            padding: "0.5rem 1rem",
            marginRight: "1vw",
            marginBottom: "1vh",
            borderRadius: "5px",
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "600",
            flex: "1",
            maxWidth: "250px",
          }}
        >
          Operation
        </button>
        <button
          type="button"
          onClick={() => setSelectedDivision("Engineer")} // Mengatur filter menjadi "Engineer"
          style={{
            backgroundColor: "#ffb061",
            border: "none",
            padding: "0.5rem 1rem",
            marginRight: "1vw",
            marginBottom: "1vh",
            borderRadius: "5px",
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "600",
            flex: "1",
            maxWidth: "250px",
          }}
        >
          Engineer
        </button>
        <button
          type="button"
          onClick={() => setSelectedDivision("Admin")} // Mengatur filter menjadi "Admin"
          style={{
            backgroundColor: "#ffdf61",
            border: "none",
            padding: "0.5rem 2rem",
            marginRight: "1vw",
            marginBottom: "1vh",
            borderRadius: "5px",
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "600",
            flex: "1",
            maxWidth: "250px",
          }}
        >
          Admin
        </button>
      </div>
      <div className="m-0" style={{ padding: "2rem 4vw" }}>
        {filteredEmployees.length === 0 ? (
          <h1>Tidak ada employee. Silahkan tambahkan employee baru</h1>
        ) : (
          <ul className="m-0 p-0" style={{ listStyle: "none", paddingLeft: 0 }}>
            {filteredEmployees.map((employee) => (
              <li
                key={employee.id}
                style={{
                  backgroundColor: getBackgroundColor(employee.division),
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div className="container-fluid d-flex p-0 m-0">
                  <div className="container-fluid d-flex p-0">
                    <div className="container-fluid p-0 m-0">
                      <h2 style={{ fontWeight: "700" }}>
                        {employee.name} - {employee.id}
                      </h2>
                      <p>{employee.email}</p>
                    </div>
                    <div
                      className="container-fluid m-0"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div style={{display:"flex", flexDirection:"column"}}>
                        <p style={{ paddingTop: "1vh", paddingRight: "1vw",paddingBottom:"0", margin:"0" }}>
                          Join at {employee.date}
                        </p>
                        <h5 style={{textAlign:"end", paddingRight:"1.3vw", paddingBottom:"0"}}>
                          <b>{employee.division}</b>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    <button
                      type="button"
                      style={{
                        minWidth: "80px",
                        height: "7vh",
                        width: "5vw",
                        borderRadius: "8px",
                        backgroundColor: "#e1e1e1",
                        border: "none",
                        fontSize: "1.5rem",
                        flex: "1",
                        fontWeight: "800",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(employee)} // Fungsi untuk membuka modal delete
                      style={{
                        minWidth: "80px",
                        height: "7vh",
                        borderRadius: "8px",
                        width: "7vw",
                        backgroundColor: "#e1e1e1",
                        border: "none",
                        fontSize: "1.5rem",
                        flex: "1",
                        fontWeight: "800",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h3>Are you sure you want to delete {employeeToDelete?.name}-{employeeToDelete?.id}?</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "1.5rem",
              }}
            >
              <button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#ff6161",
                  padding: "0.5rem 2rem",
                  borderRadius: "5px",
                  color: "black",
                  fontWeight:"700",
                  borderColor: "black",
                  width:"50%",
                  marginRight:"2rem"
                }}
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "#ccc",
                  padding: "0.5rem 2rem",
                  borderRadius: "5px",
                  fontWeight:"700",
                  borderColor: "black",
                  width:"50%",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListEmployee;
