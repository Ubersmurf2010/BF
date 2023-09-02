import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) =>{
    const { data } = await axios.post('/auth/login', params);
    return data;
});
//post - делаем подзапрос. Передаем в params логин и пароль на проверку в бекэнд. Там происходит проверка.

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) =>{
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () =>{
    const { data } = await axios.get('/auth/me');
    return data;
});




const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },

    extraReducers: {
        [fetchAuth.pending] : (state) => {
            state.data = null;
            state.status = 'loading';
        },

        [fetchAuth.fulfilled] : (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
            
        },
        [fetchAuth.rejected] : (state) => {
            state.status = 'error';
            state.data = null;
        },

        [fetchAuthMe.pending] : (state) => {
            state.data = null;
            state.status = 'loading';
        },

        [fetchAuthMe.fulfilled] : (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
            
        },
        [fetchAuthMe.rejected] : (state) => {
            state.status = 'error';
            state.data = null;
        },

        [fetchRegister.pending] : (state) => {
            state.data = null;
            state.status = 'loading';
        },

        [fetchRegister.fulfilled] : (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
            
        },
        [fetchRegister.rejected] : (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
 });

export const selectIsAuth = (state) => Boolean(state.auth.data); 
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
