import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/userSlice";

function Profile({ setCurrentLoginPage }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    hobby: ""
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        gender: currentUser.gender || "",
        hobby: currentUser.hobby || ""
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.gender.trim() || !formData.hobby.trim()) {
      setError("All fields are required");
      return;
    }

    const updatedUser = {
      ...currentUser,
      fullName: formData.fullName,
      gender: formData.gender,
      hobby: formData.hobby
    };

    dispatch(updateProfile(updatedUser));
    setError(null);
  };

  return (
    <div style={{
      backgroundColor: "#dae0e6",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
          backgroundColor: "#f8f9fa"
        }}>
          <h2 style={{
            margin: 0,
            color: "#1c1c1c",
            fontSize: "20px",
            fontWeight: "500"
          }}>
            Profile Settings
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          {error && (
            <div style={{
              backgroundColor: "#ffebe9",
              color: "#c0392b",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#1c1c1c",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Username
            </label>
            <input
              type="text"
              value={currentUser.username}
              disabled
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#f6f7f8",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#1c1c1c",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#1c1c1c",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                fontSize: "14px"
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#1c1c1c",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Hobby
            </label>
            <input
              type="text"
              name="hobby"
              value={formData.hobby}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px"
          }}>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#afffa8",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;