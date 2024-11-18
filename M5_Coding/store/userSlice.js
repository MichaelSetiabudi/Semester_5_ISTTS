import { createSlice } from "@reduxjs/toolkit";

const initialUsers = [
  {
    username: "admin",
    password: "admin123",
    fullName: "Admin User",
    gender: "Male",
    hobby: "Reading",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: initialUsers,
    currentUser: null,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      console.log("Current users before registration:", state.users);

      const isUserExist = state.users.find(
        (user) => user.username === action.payload.username
      );

      if (isUserExist) {
        console.log(
          "Registration failed - Username already exists:",
          action.payload.username
        );
        state.error = "Username already exists!";
      } else {
        state.users.push(action.payload);
        console.log("New user registered:", action.payload);
        console.log("Updated users list:", state.users);
        state.error = null;
      }
    },
    loginUser: (state, action) => {
      const user = state.users.find(
        (u) =>
          u.username === action.payload.username &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        state.error = null;
      } else {
        state.error = "Invalid username or password";
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearError } =
  userSlice.actions;

export default userSlice.reducer;
