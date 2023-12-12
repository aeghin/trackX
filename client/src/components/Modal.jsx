import { useState } from "react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { GoProjectRoadmap } from 'react-icons/go';
import { AiFillEdit } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { addProject } from "state";

export const Modal = ({ onClose }) => {

    const [projectName, setProjectName] = useState('');
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const user_Id = user._id;
    const dispatch = useDispatch();



    const handleSubmit = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/project`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: projectName, user_id: user_Id })
            });

        if (response.ok) {
            const data = await response.json();

            dispatch(addProject(data));
        } else {
            console.log('Something went wrong:', await response.json());
        };
        // console.log(projectName)
        onClose();
        toast.success('project created!');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3 h-68 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">
                    <AiOutlineCloseCircle className="text-3xl" />
                </button>
                <div className="flex items-center justify-center mb-4 mt-8">
                    <h2 className="text-3xl">Create a New Project</h2>
                    <GoProjectRoadmap className="ml-2 text-2xl mt-1" />
                </div>
                <div className="flex justify-center">
                    <input
                        type="text"
                        className="border p-4 w-2/3 text-xl"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-gray-500 text-white text-xl p-4 w-1/3 hover:bg-indigo-500 rounded flex justify-center items-center"
                    >
                        <span>Create</span>
                        <AiFillEdit className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    )
};
