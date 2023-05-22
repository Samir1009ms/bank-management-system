import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from '../../services/api.services';
import { setTransactions, dataT } from "../expense/transactions-slice";



export const getTransactions = createAsyncThunk(
    'getTransactions',
    async (_, thunkApi) => {
        try {
            let userId = localStorage.getItem("userId");
            const data = await ApiService.transctions(userId)
            thunkApi.dispatch(setTransactions(data))
            thunkApi.dispatch(dataT(data))

            // console.log(data);
            // console.log("ss");
            return data
        }
        catch (err) {
            console.log(err);
            throw err
        }
    }
)