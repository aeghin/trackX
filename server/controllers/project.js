import Project from '../models/Project.js';
import User from '../models/User.js';
import Issue from '../models/Issue.js';


// Create Project 

export const createProject = async (req, res) => {

    try {


        // destructuring request body to get user and title of project.
        const { user_id, title } = req.body;
        // getting the user - not sure i need it


        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        };

        //creating the new Project
        const newProject = new Project({
            user_id,
            title,
        });

        // saving project
        await newProject.save();

        // Update the user to include the new project
        user.projects.push(newProject._id);
        await user.save();


        // getting all past and newly created project(s)
        const project = await Project.find();

        res.status(201).json(project);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};


export const createIssue = async (req, res) => {

    try {
        const { projectId } = req.params;
        const { title, description, created_by, status, due_date } = req.body;

        // Validate project existence
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        };

        // Create a new issue
        const newIssue = new Issue({
            title,
            description,
            created_by,
            status,
            due_date
        });

        // Save the issue
        await newIssue.save();

        // Update the project with this new issue
        project.issues.push(newIssue._id);
        await project.save();

        // Send a response
        res.status(201).json(newIssue);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }

};

export const deleteIssue = async (req, res) => {
    try {
        const { projectId, issueId } = req.params;

        // Check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        };

        // Check if the issue exists and delete it
        const issue = await Issue.findByIdAndDelete(issueId);
        if (!issue) {
            return res.status(400).json({ message: "Issue not found" });
        };

        // Remove the issue ID from the project's issues array using MongoDB's $pull operator
        await Project.findByIdAndUpdate(projectId, { $pull: { issues: issueId } });

        return res.status(200).json({ message: "Issue deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const deleteProjectWithIssues = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Delete all issues associated with the project
        await Issue.deleteMany({ _id: { $in: project.issues } });

        // Delete the project itself
        await Project.findByIdAndDelete(projectId);

        // Remove this project from the user's project array
        const user = await User.findById(project.user_id);
        user.projects.pull(projectId);
        await user.save();

        res.status(200).json({ message: "Project and its issues successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    //getting all projects to display when user is logged in and in the dashboard.

    try {
         const { userId } = req.params;

        const projects = await Project.find({ user_id: userId });

        res.status(200).json(projects);

    } catch (err) {

        res.status(404).json({ message: err.message });

    };

};

export const getAllIssuesByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find the project by projectId
        const project = await Project.findById(projectId).populate('issues');

        if (!project) return res.status(404).json({ message: "Project not found" });

        // Return the issues associated with this project
        return res.status(200).json(project.issues);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const updateIssue = async (req, res) => {

    try {
        const { issueId } = req.params;
        const { title, description, status } = req.body;
        const issue = await Issue.findByIdAndUpdate(issueId, { title, description, status }, { new: true });


        return res.status(200).json(issue);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
};

export const updateProjectName = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title } = req.body;
        const updatedProjectName = await Project.findByIdAndUpdate(projectId, { title }, { new: true });

        return res.status(200).json(updatedProjectName);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
};
