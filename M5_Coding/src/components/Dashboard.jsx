import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { updateLikes } from "../../store/postSlice";

function Dashboard({ setCurrentPage }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  if (!currentUser) {
    setCurrentPage("login");
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    setCurrentPage("login");
  };

  const handleVote = (postId, increment) => {
    dispatch(updateLikes({ postId, increment }));
  };

  return (
    <div style={{
      backgroundColor: "#dae0e6",
      minHeight: "100vh"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "0.5rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 0.063rem 0.188rem rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem"
        }}>
          <span style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ff4500",
            cursor: "pointer"
          }}>reddit</span>
        </div>
        <div style={{
          display: "flex",
          gap: "1.25rem"
        }}>
          <span style={{
            color: "#1c1c1c",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "1.25rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500",
            backgroundColor: "#f6f7f8"
          }}>
            Dashboard
          </span>
          <span style={{
            color: "#1c1c1c",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "1.25rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}>Add Post</span>
          <span style={{
            color: "#1c1c1c",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "1.25rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}>Profile</span>
          <button
            onClick={handleLogout}
            style={{
              color: "#0079d3",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "1.25rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
              border: "none",
              background: "none"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: "40rem",
        margin: "1.25rem auto",
        padding: "0 1.25rem"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {posts.map((post) => (
            <div key={post.id} style={{
              backgroundColor: "white",
              borderRadius: "0.25rem",
              border: "0.063rem solid #ccc",
              padding: "1rem",
              position: "relative"
            }}>
              <div style={{
                fontSize: "0.75rem",
                color: "#787c7e",
                marginBottom: "0.5rem"
              }}>
                Posted by {post.author}
              </div>
              <div style={{
                width: "100%"
              }}>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  color: "#222"
                }}>{post.title}</div>
                
                {post.link_url && post.link_url !== "" && (
                  <img 
                    src={post.link_url} 
                    alt={post.title}
                    style={{
                      width: "85%",
                      maxHeight: "20rem",
                      objectFit: "contain",
                      marginTop: "0.5rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "0.25rem"
                    }}
                  />
                )}
                <div style={{
                  fontSize: "0.875rem",
                  color: "#1c1c1c",
                  marginBottom: "0.5rem",
                  wordWrap: "break-word"
                }}>{post.description}</div>
              </div>
              <div style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem"
              }}>
                <button 
                  onClick={() => handleVote(post.id, true)}
                  style={{
                    border: "none",
                    background: "#7ee17e",
                    cursor: "pointer",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "bold"
                  }}
                >
                  UP
                </button>
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: "#1a1a1b"
                }}>{post.likes} Likes</span>
                <button 
                  onClick={() => handleVote(post.id, false)}
                  style={{
                    border: "none",
                    background: "#ff6b6b",
                    cursor: "pointer",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "bold"
                  }}
                >
                  DW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;