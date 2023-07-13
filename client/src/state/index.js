import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    projects: [],
    issues: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setProjects: (state, action) => {
            state.projects = action.payload.projects;
        },
        setIssues: (state, action) => {
            state.issues = action.payload.issues;
        }
    }
});

export const { setLogin, setLogout, setProjects, setIssues } = authSlice.actions;

export default authSlice.reducer;