import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from 'state';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ProjectEdit } from './ProjectEdit';
import { useState } from 'react';


export const ProjectCard = ({ title, projectId }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const [isModalOpen, setIsModal] = useState(false);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3001/projects/${projectId}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'There was an error deleting the project');
        };

        dispatch(deleteProject({ projectId }));
        toast.error('project deleted')
    }


    return (
        <>

            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg transition duration-600 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 hover:text-white">
                <Link to={`/projects/${projectId}/issues`} className="flex-grow hover:text-white transition duration-300 ease-in-out">
                    <h3 className="text-xl font-semibold">{title}</h3>
                </Link>
                <button onClick={() => setIsModal(true)} className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-400 pr-2">
                    <FaRegEdit />
                </button>
                <button onClick={handleDelete}
                    className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-red-500"
                >
                    <FaTrashAlt />
                </button>
            </div>
            {isModalOpen && <ProjectEdit onClose={() => setIsModal(false)} projectId={projectId} />}
        </>
    )
};


