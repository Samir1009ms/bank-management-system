import { configureStore } from "@reduxjs/toolkit"


import bankCardsSlice from "./expense/bankCards-slice"
import themeSlice from "./expense/theme-slice"

const cartStore = configureStore({
    reducer: {
        bankCards: bankCardsSlice,
        themeSlice: themeSlice
    }
})

export default cartStore