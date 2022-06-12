import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await axios.get(usersUrl);
    return [...res.data];
  } catch (err) {
    return err.message;
  }
});

const usersSlice = createSlice({
  name: "usersName",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (s, a) => {
      return a.payload;
    });
  },
});

export const selectAllUsers = (s) => s.usersName;

export default usersSlice.reducer;
