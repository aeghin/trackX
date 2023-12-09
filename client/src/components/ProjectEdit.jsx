import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProject } from "state";
import { toast } from "sonner";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoProjectRoadmap } from 'react-icons/go';
import { AiFillEdit } from 'react-icons/ai';

export const ProjectEdit = ({ onClose, projectId }) => {

    const token = useSelector(state => state.token);
    const project = useSelector(state => state.projects);
    const dispatch = useDispatch();

    const currentProject = project.find(proj => proj._id === projectId);
    const projectTitle = currentProject?.title;

    const [title, setTitle] = useState(projectTitle);

    const handleSubmit = async () => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${projectId}/name`, {
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
            <div className="bg-white p-8 rounded-lg w-1/3 h-80 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">
                    <AiOutlineCloseCircle className="text-3xl" />
                </button>
                <div className="flex justify-center mb-4 mt-8">
                    <h2 className="text-4xl">Project Name</h2>
                    <GoProjectRoadmap className="ml-2 mt-1 text-4xl" />
                </div>
                <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        className="border p-3 mb-4 w-2/3 mx-auto text-lg"
                        placeholder={projectTitle}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-gray-500 text-white p-4 hover:bg-indigo-500 rounded flex items-center justify-between"
                    >
                        <span>Update Name</span>
                        <AiFillEdit className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};
