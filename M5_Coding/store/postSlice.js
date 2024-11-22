import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        ...action.payload,
        id: state.posts.length + 1,
        timePosted: "Just now",
        likes: 0,
        userInteractions: {},
        initialLikes: 0,
      });
    },
    updateLikes: (state, action) => {
      const { postId, userId, action: voteAction } = action.payload;
      const post = state.posts.find((post) => post.id === postId);

      if (!post) return;

      if (post.initialLikes === undefined) {
        post.initialLikes = post.likes;
      }

      const currentInteraction = post.userInteractions[userId] || null;

      if (currentInteraction === voteAction) {
        post.likes = post.initialLikes;
        post.userInteractions[userId] = null;
      } else {
        if (voteAction === "like") {
          if (currentInteraction === "dislike") {
            post.likes = post.initialLikes;
          }
          post.likes += 1;
          post.userInteractions[userId] = "like";
        } else if (voteAction === "dislike") {
          if (currentInteraction === "like") {
            post.likes -= 1;
          }
          if (post.likes > 0) {
            post.likes -= 1;
          }
          post.userInteractions[userId] = "dislike";
        }
      }
    },
  },
});

export const { addPost, updateLikes } = postsSlice.actions;
export default postsSlice.reducer;
