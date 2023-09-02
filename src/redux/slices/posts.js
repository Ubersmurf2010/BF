import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async() => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchNewPosts = createAsyncThunk('/posts/fetchNewPosts', async() => {
    const {data} = await axios.get('/posts/new');
    return data;
});

export const fetchPopularPosts = createAsyncThunk('/posts/fetchPopularPosts', async() => {
    const {data} = await axios.get('/posts/popular');
    return data;
});

export const fetchTagsPosts = createAsyncThunk('/tags/fetchTags0Posts', async(name) => {
    const {data} = await axios.get(`/tags/${name}`);
    return data;
});


export const fetchTags = createAsyncThunk('/posts/fetchTags', async() => {
    const {data} = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('auth/fetchRemovePost', async (id) =>{
    await axios.delete(`/posts/${id}`);
});



const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice ({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        // три редюсера получения неотсортированных статей
        [fetchPosts.pending] : (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },

        [fetchPosts.fulfilled] : (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected] : (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // три редюсера получения новых статей

        [fetchNewPosts.pending] : (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },

        [fetchNewPosts.fulfilled] : (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchNewPosts.rejected] : (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // три редюсера получения наиболее популярных статей

        [fetchPopularPosts.pending] : (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },

        [fetchPopularPosts.fulfilled] : (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPopularPosts.rejected] : (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // три редюсера получения статьи по тегам
        [fetchTagsPosts.pending] : (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },

        [fetchTagsPosts.fulfilled] : (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchTagsPosts.rejected] : (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // три редюсера получение тэгов
        [fetchTags.pending] : (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },

        [fetchTags.fulfilled] : (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected] : (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        // три редюсера удаления статей
        [fetchRemovePost.pending] : (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
});

export const postReducer = postsSlice.reducer;
