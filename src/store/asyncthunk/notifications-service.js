import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.services';
import { setCard, setTotal } from '../expense/bankCard-slice.js';
import { setNotifcations } from '../expense/notifications-slice';

export const getNotifications = createAsyncThunk(
    'notifications',
    async (_, thunkAPI) => {
        try {
            let userId = localStorage.getItem("userId");
            const data = await ApiService.notii(userId);
            thunkAPI.dispatch(setNotifcations(data));
            // thunkAPI.dispatch(setTotal(data.cards));
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);