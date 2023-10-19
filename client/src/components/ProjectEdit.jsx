import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProject } from "state";
import { toast } from "sonner";

export const ProjectEdit = ({ onClose, projectId }) => {

    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    const handleSubmit = async () => {

        const response = await fetch(`http://localhost:3001/projects/${projectId}/name`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'There was an error editing issue');
        };

        dispatch(updateProject({ projectId, newTitle: data.title }));
        onClose();
        toast.success('project name updated!');

    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">X</button>
                <h2 className="text-2xl mb-4">Update Project Name</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="new name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-gray-500 text-white p-2 hover:bg-indigo-500 rounded"
                >
                    Update Name
                </button>
            </div>
        </div>
    );
};
