import { FaTrashAlt } from 'react-icons/fa';

export const ProjectCard = ({ title }) => (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-600 hover:text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
            className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-red-600"
        >
            <FaTrashAlt />
        </button>
    </div>
);

