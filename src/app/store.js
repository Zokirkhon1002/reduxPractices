import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from '../features/posts/postSlice';
import usersReducer from '../features/posts/users/userSlice'



export const store = configureStore({
    reducer: {
        counterName: counterReducer,
        postsName: postsReducer,
        usersName: usersReducer
    }
})