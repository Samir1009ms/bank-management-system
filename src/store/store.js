import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./expense/theme-slice"
import transactionsSlice from "./expense/transactions-slice"
import cardSlice from "./expense/bankCard-slice"

const cartStore = configureStore({
    reducer: {
        themeSlice: themeSlice,
        transactionsSlice: transactionsSlice,
        card: cardSlice
    }
})

export default cartStore