import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "",
    },
    reducers: {

        theme: (state, action) => {
            // console.log(action.payload);
            state.theme = action.payload;
        }
    }
})

export const { theme } = themeSlice.actions
export default themeSlice.reducer
