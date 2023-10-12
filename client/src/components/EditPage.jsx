import { useState } from "react";


export const EditPage = ({ issues }) => {

    const [editDetails, setEditDetails] = useState({
        title: "",
        description: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDetails(prevState => ({ ...prevState, [name]: value }));
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
        </div>
    );
};
