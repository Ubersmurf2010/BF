import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchCard = createAsyncThunk('/cards/fetchCard', async() => {
    const {data} = await axios.get('/cards');
    return data;
});

export const fetchRemoveCard = createAsyncThunk('auth/fetchRemoveCard', async (id) =>{
    await axios.delete(`/cards/${id}`);
});

const initialState = {
    cards: {
        items: [],
        status: 'loading',
    },
};

const cardsSlice = createSlice ({
    name: 'cards',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchCard.pending] : (state) => {
            state.cards.items = [];
            state.cards.status = 'loading';
        },

        [fetchCard.fulfilled] : (state, action) => {
            state.cards.items = action.payload;
            state.cards.status = 'loaded';
        },
        [fetchCard.rejected] : (state) => {
            state.cards.items = [];
            state.cards.status = 'error';
        },
        [fetchRemoveCard.pending] : (state, action) => {
            state.cards.items = state.cards.items.filter(cardObj => cardObj._id !== action.meta.arg);
        },
    },
});

export const cardReducer = cardsSlice.reducer;
