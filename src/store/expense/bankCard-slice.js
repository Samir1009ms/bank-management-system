import { createSlice } from '@reduxjs/toolkit';
import { getCard } from '../asyncthunk/bankCard-service';

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cardData: null,
        loading: true,
        error: null,
        total: 0,
        cards: []
    },
    reducers: {
        setCard: (state, action) => {
            state.cardData = action.payload;
            state.cards = state.cardData.cards
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload.reduce((acc, item) => (acc + item.balance), 0)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCard.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(getCard.fulfilled, (state, action) => {
                state.loading = false;
                state.cardData = action.payload;
                state.cards = state.cardData.cards
            })
            .addCase(getCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCard, setLoading, setError, setTotal } = cardSlice.actions;
export default cardSlice.reducer;
