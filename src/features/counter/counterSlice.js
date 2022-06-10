import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}
export const counterSlice = createSlice({
    name: 'counterName',
    initialState,
    reducers: {
        inc: (state)=> {
            state.count +=1;
        },
        dec: (state)=> {
            state.count -=1;
        },
        res: (state) => {
            state.count = 0;
        },
        incByAmount: (state,action) => {
            state.count += action.payload;
        }
    }
})

export const selectCount = (state) => state.counterName.count;
export const {inc, dec, res, incByAmount}  = counterSlice.actions;
export default counterSlice.reducer;