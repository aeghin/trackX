import mongoose from 'mongoose';

// Porject model w/ user, issues reference

const ProjectSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
    }],
},
    { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;