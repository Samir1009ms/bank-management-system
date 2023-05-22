import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "../asyncthunk/transactions-service";
import moment from "moment";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: null,
        loading: false,
        error: null,
        incoming: null,
        outcoming: []

    },
    reducers: {
        setTransactions: ((state, action) => {
            // console.log(action.payload);
            // console.log(":sss");
            state.transactions = action.payload
            state.incoming = action.payload.filter((e) => e.type !== "Outgoing")

        }),
        setLoading: ((state, action) => {
            state.loading = action.payload
        }),
        setError: (state, action) => {
            state.error = action.payload;

        },
        dataT: ((state, action) => {
            console.log(action.payload);
            // const xerc = action.payload
            if (state.transactions) {
                const sorts = state.transactions.sort((a, b) => b.date.localeCompare(a.date))
                const groupDates = sorts.reduce((acc, date) => {
                    const [month, day, year] = moment(date.date).format("MMMM DD YYYY").split(" ")
                    const datesKey = `${month}  ${year}`
                    if (!acc[datesKey]) {
                        acc[datesKey] = []
                    }
                    acc[datesKey].push(date)
                    return acc
                }, {})
                state.outcoming = Object.entries(groupDates).map(([date, transctions]) => ({
                    date,
                    transctions
                }))
            } else {
                console.log("x");
            }


        })

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.loading = true
                state.error = null
                // console.log("s");
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false
                state.transactions = action.payload
                // console.log("ss");

            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                // console.log("sss");

            })
    }
})

export const { setTransactions, dataT } = transactionsSlice.actions
export default transactionsSlice.reducer
