import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateIssue } from "state";


export const EditPage = ({ issues, issueId, projectId, closeModal, goBack }) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.token);

    const [editDetails, setEditDetails] = useState({
        title: issues.title,
        description: issues.description,
        status: issues.status,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDetails(prevState => ({ ...prevState, [name]: value }));
    };

    const updateIssueHandler = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/issues/${issueId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(editDetails)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'There was an error editing issue');
        };

        dispatch(updateIssue({ projectId, issueId, updatedIssue: data }));
        toast.success('Issue updated');
        closeModal()
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Title:</h3>
                <input type="text" name="title" value={editDetails.title} className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight" onChange={handleChange} placeholder={issues.title} />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Description:</h3>
                <textarea name="description" value={editDetails.description} className="resize-y border border-gray-300 rounded w-full py-4 px-3 text-gray-700 leading-tight h-40" onChange={handleChange} placeholder={issues.description}></textarea>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Status:</h3>
                <select name="status" value={editDetails.status} onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight">
                    <option value="" disabled>Select status</option>
                    <option>Backlog</option>
                    <option>In-Progress</option>
                    <option>Completed</option>
                </select>
            </div>
            <div className="flex justify-end">
                <button onClick={goBack} className="bg-indigo-100 p-2 px-6 mr-2 rounded-lg shadow-md hover:bg-red-400">Cancel</button>
                <button onClick={updateIssueHandler} className="bg-indigo-100 p-2 px-6 rounded-lg shadow-md hover:bg-green-400">Update Issue</button>
            </div>
        </div>
    );
};
