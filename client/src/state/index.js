import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    projects: [],
    issues: {},
};

export const globalSlice = createSlice({
    name: "global",
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
        addIssue: (state, action) => {
            const { projectId, issue } = action.payload;
            if (!state.issues[projectId]) {
                state.issues[projectId] = [];
            }
            state.issues[projectId].push(issue);
        },
        deleteIssue: (state, action) => {
            const { projectId, issueId } = action.payload;
            if (state.issues[projectId]) {
                state.issues[projectId] = state.issues[projectId].filter(issue => issue.id !== issueId);
            };
        },

    },
});

export const { setLogin, setLogout, setProjects, setIssues } = globalSlice.actions;

export default globalSlice.reducer;