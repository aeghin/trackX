import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addProject } from "state";
export const Modal = ({ onClose, user, token, onProjectAdded }) => {
    const [projectName, setProjectName] = useState('');
    const user_Id = user._id;
    // const dispatch = useDispatch();

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3001/projects/project",
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: projectName, user_id: user_Id })
            });

        if (response.ok) {
            const data = await response.json();
            onProjectAdded(data);
        } else {
            console.log('Something went wrong:', await response.json());
        };
        // console.log(projectName)
        onClose();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">X</button> {/* This button is inside the modal */}
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
