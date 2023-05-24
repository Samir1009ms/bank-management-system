import { createSlice } from '@reduxjs/toolkit';
import { getCard } from '../asyncthunk/bankCard-service';

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cardData: null,
        loading: false,
        error: null,
        total: 0
    },
    reducers: {
        setCard: (state, action) => {
            state.cardData = action.payload;
            // console.log(state.cardData);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTotal: (state, action) => {
            // console.log(action.payload);
            state.total = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCard.fulfilled, (state, action) => {
                state.loading = false;
                state.cardData = action.payload;
            })
            .addCase(getCard.rejected, (state, action) => {

                state.loading = false;

                state.error = action.error.message;
            });
    },
});

export const { setCard, setLoading, setError, setTotal } = cardSlice.actions;
export default cardSlice.reducer;