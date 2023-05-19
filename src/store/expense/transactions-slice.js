import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: "bankCards",
    initialState: {
        transactions: []
    },
    reducers: {

        getTransactions: ((state, action) => {
            console.log(action.payload);
        })

    }
})

export const { getTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer
