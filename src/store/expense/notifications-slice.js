import { createSlice } from '@reduxjs/toolkit';
import { getCard } from '../asyncthunk/bankCard-service';
import { fill, filter } from 'lodash';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notificatons: [],
        loading: true,
        error: null,
        total: 0,
        cards: []
    },
    reducers: {
        setNotifcations: (state, action) => {
            state.notificatons = action.payload;
            // console.log(action.payload)
            // state.cards = state.cardData.cards
        },
        filterNotifications: (state, action) => {
            state.notificatons = state.notificatons.filter((x) => x._id !== action.payload)
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

export const { setNotifcations, setLoading, setError, setTotal, filterNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
