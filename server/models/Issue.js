import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Backlog', 'In-Progress', 'Completed'],
        required: true,
    },
    due_date: {
        type: Date,
    }
},
    { timestamps: true }
);

const Issue = mongoose.model('Issue', IssueSchema);

export default Issue;

