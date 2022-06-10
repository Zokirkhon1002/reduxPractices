import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Zokrkhon" },
  { id: "1", name: "Sayfullo" },
  { id: "2", name: "Boburmirzo" },
];

const usersSlice = createSlice({
  name: "usersName",
  initialState,
  reducers: {},
});

export const selectAllUsers = (s) => s.usersName;

export default usersSlice.reducer;
