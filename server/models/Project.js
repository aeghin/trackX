import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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