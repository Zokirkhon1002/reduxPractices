import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const PostsUrl = "https://jsonplaceholder.typicode.com/posts";
// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: "I've heard good things.",
//         // date: sub(new Date(), { minutes: 10 }).toISOString(),
//         date: "2020-01-15",
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: '2',
//         title: 'Slices...',
//         content: "The more I say slice, the more I want pizza.",
//         // date: sub(new Date(), { minutes: 5 }).toISOString(),
//         date: "2021-01-15",
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     }
// ]

const initialState = {
  posts: [],
  status: "idle", // 'loading' || 'idle' || 'succeeded' || 'failed';
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(PostsUrl);
    return [...res.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const res = await axios.post(PostsUrl, initialPost);
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const postsSlice = createSlice({
  name: "postsName",
  initialState,
  reducers: {
    postAdded: {
      reducer(s, a) {
        s.posts.push(a.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(s, a) {
      const { postId, reaction } = a.payload;
      const existingPost = s.posts.find(({ id }) => id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (s, a) => {
        s.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (s, a) => {
        s.status = "succeeded";
        // adding date and reactions
        let min = 1;
        const loadedPosts = a.payload.map((p) => {
          p.date = sub(new Date(), { minutes: min++ }).toISOString();
          p.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return p;
        });
        // Add any fetched posts to the array
        s.posts = s.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(addNewPost.fulfilled, (s, a) => {
        a.payload.userId = +a.payload.userId;
        a.payload.date = new Date().toISOString();
        a.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(a.payload);
        s.posts.push(a.payload);
      });
  },
});

export const selectAllPosts = (s) => s.postsName.posts;
export const getPostsStatus = (s) => s.postsName.status;
export const getPostsError = (s) => s.postsName.error;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
