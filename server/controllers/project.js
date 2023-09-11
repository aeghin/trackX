import Project from '../models/Project.js';
import User from '../models/User.js';


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
        const { title, description, created_by, status, due_date, project_id } = req.body;

        // Validate project existence
        const project = await Project.findById(project_id);
        if (!project) {
            return res.status(400).json({ message: 'Project not found' });
        }

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

export const getAllProjects = async (req, res) => {
    //getting all projects to display when user is logged in and in the dahboard.
    try {
        const projects = await Project.find();

        res.status(200).json(projects);

    } catch (err) {

        res.status(404).json({ message: err.message });

    };

};

export const deleteProject = (req, res) => {

    try {

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
