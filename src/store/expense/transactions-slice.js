import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "../asyncthunk/transactions-service";
import moment from "moment";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: null,
        loading: true,
        error: null,
        incoming: [],
        outcoming: [],
        monthData: null

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
            let xerc = [...action.payload]
            if (state.transactions) {
                const sorts = xerc.sort((a, b) => b.date.localeCompare(a.date))
                const groupDates = sorts.reduce((acc, date) => {
                    const [month, year] = moment(date.date).format("MMMM DD YYYY").split(" ")
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
        }),
        setTotalIncomne: ((state, action) => {
            let data = []
            state.monthData = action.payload.filter((e) => e.type !== "Outgoing")
            const months = moment.months();
            // console.log(months);
            months.forEach((month) => {
                data.push({ month: month, amount: 0 });
            });
            state.monthData.forEach((transaction) => {
                const month = moment(transaction.date).format("MMMM");
                const index = data.findIndex((item) => item.month === month);
                if (index !== -1) {
                    data[index].amount += transaction.amount;
                }
            });
            state.monthData = data
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                // state.loading = true
                state.error = null
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false
                state.transactions = action.payload
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                // console.log("sss");

            })
    }
})

export const { setTransactions, dataT, setTotalIncomne, setLoading } = transactionsSlice.actions
export default transactionsSlice.reducer
