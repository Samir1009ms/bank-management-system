import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.services';
import { setCard, setTotal } from '../expense/bankCard-slice.js';

export const getCard = createAsyncThunk(
    'getCard',
    async (_, thunkAPI) => {
        try {
            let userId = localStorage.getItem("userId");
            const data = await ApiService.card(userId);
            thunkAPI.dispatch(setCard(data));
            thunkAPI.dispatch(setTotal(data.cards.reduce((acc, item) => (acc + item.balance), 0)));
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);
