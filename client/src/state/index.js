import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    projects: [],
    issues: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    }
});