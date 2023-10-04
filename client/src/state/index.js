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
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setIssues: (state, action) => {
            const { projectId, issues } = action.payload;
            state.issues[projectId] = issues;
        },
        addProject: (state, action) => {
            state.projects = action.payload
        },
        deleteProject: (state, action) => {
            const { projectId } = action.payload;
            state.projects = state.projects.filter(project => project._id !== projectId);

            delete state.issues[projectId];
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
                state.issues[projectId] = state.issues[projectId].filter(issue => issue._id !== issueId);
            };
        },

    },
});

export const { setLogin, setLogout, setIssues, addIssue, deleteIssue, setProjects, deleteProject, addProject } = globalSlice.actions;

export default globalSlice.reducer;