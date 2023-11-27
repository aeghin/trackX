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
            state.projects = [];
            state.issues = {};
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setIssues: (state, action) => {
            const { projectId, issues } = action.payload;
            
            state.issues[projectId] = issues;
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
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
        updateIssue: (state, action) => {
            const { projectId, issueId, updatedIssue } = action.payload;
            const projectIssues = state.issues[projectId];
            if (projectIssues) {
                const issueIndex = projectIssues.findIndex(issue => issue._id === issueId);
                if (issueIndex !== -1) {
                    projectIssues[issueIndex] = updatedIssue;
                };
            };
        },
        updateProject: (state, action) => {
            const { projectId, newTitle } = action.payload;
            const projectIndex = state.projects.findIndex(project => project._id === projectId);
            if (projectIndex !== -1) {
                state.projects[projectIndex].title = newTitle;
            };
        },
    },
});

export const { setLogin, setLogout, setIssues, addIssue, deleteIssue, setProjects, deleteProject, addProject, updateIssue, updateProject } = globalSlice.actions;

export default globalSlice.reducer;