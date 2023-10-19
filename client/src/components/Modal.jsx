import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";


export const Modal = ({ onClose, onProjectAdded }) => {
    const [projectName, setProjectName] = useState('');
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const user_Id = user._id;


    const handleSubmit = async () => {
        const response = await fetch("https://track-x-five.vercel.app/projects/project",
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: projectName, user_id: user_Id })
            });

        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            onProjectAdded(data);
        } else {
            console.log('Something went wrong:', await response.json());
        };
        // console.log(projectName)
        onClose();
        toast.success('project created!');
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">X</button>
                <h2 className="text-2xl mb-4">Create a New Project</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-gray-500 text-white p-2 hover:bg-indigo-500 rounded"
                >
                    Create
                </button>
            </div>
        </div>
    )
};
