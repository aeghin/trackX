import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addIssue } from "state";
import { toast } from "sonner";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoProjectRoadmap } from 'react-icons/go';
import { AiFillEdit } from 'react-icons/ai';

export const IssueModal = ({ onClose, projectId }) => {

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

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

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:3001/projects/${projectId}/issue`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(issueData),
            });
            console.log(issueData);
        if (response.ok) {
            
            const data = await response.json();
            dispatch(addIssue({ projectId, issue: data }));
        } else {
            console.log('Something went wrong:', await response.json());
        };

        onClose();
        toast.success('issue created!')
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">
                    <AiOutlineCloseCircle className="text-xl"/>
                </button>
                <div className="flex items-center mb-4">
                    <h2 className="text-2xl">Add a New Issue</h2>
                    <GoProjectRoadmap className="ml-2 text-2xl" />
                </div>
                <input
                    type="text"
                    name="title"
                    className="border p-2 w-full mb-4 rounded-md border-gray-300"
                    placeholder="title"
                    value={issueData.title}
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="description"
                    className="border p-2 w-full mb-4 rounded-md h-40 border-gray-300"
                    placeholder="description"
                    value={issueData.description}
                    onChange={handleChange}
                />
                <select
                    name="status"
                    value={issueData.status}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded-md border-gray-300"
                >
                    <option value="" disabled>Select a status</option>
                    <option value="Backlog">Backlog</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="bg-gray-500 text-white p-2 hover:bg-indigo-500 rounded flex items-center justify-between"
                >
                    <span>Add Issue</span>
                    <AiFillEdit className="ml-1" />
                </button>
            </div>
        </div>
    )
};
