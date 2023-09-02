import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { cardReducer } from './slices/cards';


const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
        cards: cardReducer,
    },
});

export default store;