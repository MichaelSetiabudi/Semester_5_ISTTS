import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Mana yang datang duluan, telur atau ayam?",
      author: "Lawrencescience",
      likes: 0,
      description: "Deskripsi singkat dari judul dan akan terus berlanjut ke halaman berikutnya",
      timePosted: "2 hours ago",
      link_url: "",
      userInteractions: {},
      prevLikes: {} 
    },
    {
      id: 2,
      title: "Ini contoh post yang ditambahkan oleh user",
      author: "Nickalaladive",
      likes: 11,
      description: "Ini contoh post yang ditambahkan oleh user lain dengan ketentuan reply seperti ini",
      timePosted: "5 hours ago",
      link_url: "",
      userInteractions: {},
      prevLikes: {} 
    },
  ],
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
        prevLikes: {}
      });
    },
    updateLikes: (state, action) => {
      const { postId, userId, action: voteAction } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      
      if (!post) return;
      
      const currentInteraction = post.userInteractions[userId] || null;
      
      // Function to safely update likes
      const updateLikeCount = (change) => {
        const newLikes = post.likes + change;
        post.likes = Math.max(0, newLikes);
      };

      if (currentInteraction === voteAction) {
        if (voteAction === 'like') {
          updateLikeCount(-1);
        } else if (voteAction === 'dislike') {
          // Kembalikan ke nilai sebelum dislike
          post.likes = post.prevLikes[userId] || post.likes;
        }
        post.userInteractions[userId] = null;
        delete post.prevLikes[userId];
        return;
      }

      if (voteAction === 'like') {
        if (currentInteraction === 'dislike') {
          post.likes = post.prevLikes[userId] || post.likes;
          delete post.prevLikes[userId];
        }
        updateLikeCount(1);
        post.userInteractions[userId] = 'like';
      } else if (voteAction === 'dislike') {
        if (!post.prevLikes[userId]) {
          post.prevLikes[userId] = post.likes;
        }
        if (currentInteraction === 'like') {
          updateLikeCount(-1);
        }
        if (post.likes > 0) {
          updateLikeCount(-1);
        }
        post.userInteractions[userId] = 'dislike';
      }
    }
  },
});

export const { addPost, updateLikes } = postsSlice.actions;
export default postsSlice.reducer;