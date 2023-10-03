import { useState } from "react";
import { useSelector } from "react-redux";

export const IssueModal = ({ onClose }) => {

    const user = useSelector(state => state.user);

    const [issueData, setIssueData] = useState({
        title: '',
        description: '',
        created_by: user._id,
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIssueData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">X</button> {/* This button is inside the modal */}
                <h2 className="text-2xl mb-4">Add a New Issue</h2>
                <input
                    type="text"
                    name="title"
                    className="border p-2 w-full mb-4"
                    placeholder="title"
                    value={issueData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    className="border p-2 w-full mb-4"
                    placeholder="description"
                    value={issueData.description}
                    onChange={handleChange}
                />
                <select
                    name="status"
                    value={issueData.status}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4"
                >
                    <option value="" disabled>Select a status</option>
                    <option value="Backlog">Backlog</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button
                    // onClick={handleSubmit}
                    className="bg-gray-500 text-white p-2 hover:bg-indigo-500 rounded"
                >
                    Add Issue
                </button>
            </div>
        </div>
    )
};
