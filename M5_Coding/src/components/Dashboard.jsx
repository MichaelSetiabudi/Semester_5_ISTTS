import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { updateLikes } from "../../store/postSlice";
import Profile from "./Profile";
import AddPost from "./AddPost";

function Dashboard({ setCurrentPage }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  const posts = useSelector((state) => state.posts.posts);
  const allUsers = useSelector((state) => state.users.users); // Get all users for lookup
  const [currentLoginPage, setCurrentLoginPage] = React.useState("dashboard");
  const dispatch = useDispatch();

  if (!currentUser) {
    setCurrentPage("login");
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    setCurrentPage("login");
  };

  const handleVote = (postId, isUpvote) => {
    if (!currentUser) return;

    dispatch(
      updateLikes({
        postId,
        userId: currentUser.username,
        action: isUpvote ? "like" : "dislike",
      })
    );
  };

  // Function to get fullName from username
  const getAuthorFullName = (username) => {
    const user = allUsers.find(user => user.username === username);
    return user ? user.fullName : username; // Fallback to username if user not found
  };

  const getVoteButtonStyle = (post, isUpvote) => {
    const userVote = post.userInteractions[currentUser.username];
    const isActive = isUpvote ? userVote === "like" : userVote === "dislike";

    return {
      border: "none",
      background: isUpvote
        ? isActive
          ? "#2ea42e"
          : "#7ee17e"
        : isActive
        ? "#ff4040"
        : "#ff6b6b",
      cursor: "pointer",
      color: "white",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "0.75rem",
      fontWeight: "bold",
      transition: "background-color 0.2s ease",
    };
  };

  const NavButton = ({ children, isActive, onClick }) => (
    <span
      onClick={onClick}
      style={{
        color: "#1c1c1c",
        textDecoration: "none",
        padding: "0.5rem 1rem",
        borderRadius: "1.25rem",
        cursor: "pointer",
        fontSize: "0.875rem",
        fontWeight: "500",
        backgroundColor: isActive ? "#f6f7f8" : "transparent",
        transition: "background-color 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        hover: {
          backgroundColor: "#f6f7f8",
        },
      }}
    >
      {children}
    </span>
  );

  return (
    <div
      style={{
        backgroundColor: "#dae0e6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "0.5rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff4500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            reddit
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <NavButton 
            isActive={currentLoginPage === "dashboard"}
            onClick={() => setCurrentLoginPage("dashboard")}
          >
            Dashboard
          </NavButton>
          <NavButton 
            isActive={currentLoginPage === "addPost"}
            onClick={() => setCurrentLoginPage("addPost")}
          >
            Add Post
          </NavButton>
          <NavButton 
            isActive={currentLoginPage === "profile"}
            onClick={() => setCurrentLoginPage("profile")}
          >
            Profile
          </NavButton>
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
              border: "0.063rem solid #0079d3",
              background: "transparent",
              transition: "all 0.2s ease",
              hover: {
                backgroundColor: "#0079d3",
                color: "white",
              },
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {currentLoginPage === "dashboard" && (
        <div
          style={{
            maxWidth: "40rem",
            margin: "1.25rem auto",
            padding: "0 1.25rem",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.25rem",
                  border: "0.063rem solid #ccc",
                  padding: "1rem",
                  position: "relative",
                  transition: "box-shadow 0.2s ease",
                  hover: {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#787c7e",
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>Posted by {getAuthorFullName(post.author)}</span>
                  <span>•</span>
                  <span>{post.timePosted}</span>
                </div>

                <div
                  style={{
                    width: "100%",
                    paddingRight: "3rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#222",
                      lineHeight: "1.4",
                    }}
                  >
                    {post.title}
                  </div>
                  {post.link_url && post.link_url !== "" && (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <img
                        src={post.link_url}
                        alt={post.title}
                        style={{
                          width: "85%",
                          maxHeight: "20rem",
                          objectFit: "contain",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#1c1c1c",
                      marginBottom: "0.5rem",
                      wordWrap: "break-word",
                      lineHeight: "1.5",
                    }}
                  >
                    {post.description}
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <button
                    onClick={() => handleVote(post.id, true)}
                    style={getVoteButtonStyle(post, true)}
                    title="Upvote"
                  >
                    UP
                  </button>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#1a1a1b",
                      padding: "0.25rem 0",
                    }}
                  >
                    {post.likes}
                  </span>
                  <button
                    onClick={() => handleVote(post.id, false)}
                    style={getVoteButtonStyle(post, false)}
                    title="Downvote"
                  >
                    DW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentLoginPage === "profile" && (
        <Profile 
          setCurrentLoginPage={setCurrentLoginPage}
          currentUser={currentUser}
        />
      )}

      {currentLoginPage === "addPost" && (
        <AddPost setCurrentLoginPage={setCurrentLoginPage} />
      )}
    </div>
  );
}

export default Dashboard;