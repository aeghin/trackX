import Project from '../models/Project.js';
import User from '../models/User.js';


// Create Project 

export const createProject = async (req, res) => {
    try {
        // destructuring request body to get user and title of project.
        const { user_id, title } = req.body;
        // getting the user - not sure i need it
        // const user = User.findById(user_id);

        //creating the new Project
        const newProject = new Project({
            user_id,
            title,
            // do i need to assign issues here right away?
        });

        // saving project
        await newProject.save();

        // getting all past and newly created project(s)
        const project = await Project.find();

        res.status(201).json(project);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};