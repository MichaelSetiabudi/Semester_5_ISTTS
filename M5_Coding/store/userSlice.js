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
    updateProfile: (state, action) => {
      const updatedUser = action.payload;
      state.currentUser = updatedUser;
      const index = state.users.findIndex(user => user.username === updatedUser.username);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    registerUser: (state, action) => {
      const isUserExist = state.users.find(
        (user) => user.username === action.payload.username
      );
      
      if (isUserExist) {
        state.error = "Username already exists!";
      } else {
        state.users.push(action.payload);
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

export const { 
  registerUser, 
  loginUser, 
  logoutUser, 
  clearError, 
  updateProfile 
} = userSlice.actions;

export default userSlice.reducer;