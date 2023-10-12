import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



export const EditPage = ({ issues, issueId, projectId }) => {
    const navigate = useNavigate();

    const token = useSelector(state => state.token);

    const [editDetails, setEditDetails] = useState({
        title: "",
        description: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDetails(prevState => ({ ...prevState, [name]: value }));
    };

    const updateIssue = async () => {
        const response = await fetch(`http://localhost:3001/projects/issues/${issueId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(editDetails)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'There was an error editing issue');
        };
        navigate(`/projects/${projectId}/issues`);
        toast.success('Issue updated');
    };

    return (
        <div className="w-1/2 h-3/4 bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
                <h3 className="text-lg font-medium">Title:</h3>
                <input type="text" name="title" value={editDetails.title} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" onChange={handleChange} placeholder={issues.title} />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Description:</h3>
                <textarea name="description" value={editDetails.description} className="resize-y border rounded w-full py-2 px-3 text-gray-700 leading-tight" onChange={handleChange} placeholder={issues.description}></textarea>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Status:</h3>
                <select name="status" value={editDetails.status} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                    <option value="" disabled>Select status</option>
                    <option>Back-log</option>
                    <option>In-progress</option>
                    <option>Completed</option>
                </select>
            </div>
            <div className="flex justify-end">
                <button onClick={updateIssue} className="bg-green-400 py-2 px-6 rounded-lg shadow-md hover:bg-indigo-100">Update Issue</button>
            </div>
        </div>
    );
};
