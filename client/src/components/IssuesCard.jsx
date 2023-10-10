import { FaTrashAlt } from 'react-icons/fa';
import { deleteIssue } from 'state';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';


export const IssuesCard = ({ title, token, projectId, issueId }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {

        const response = await fetch(`http://localhost:3001/projects/${projectId}/${issueId}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'There was an error deleting the project');
        };

        dispatch(deleteIssue({ projectId, issueId }));
        toast.error('issue deleted!');

    };

    return (

        <div className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-lg transition duration-600 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 hover:text-white">
            <Link to={`/projects/${projectId}/${issueId}`}>
                <h3 className="text-xl font-semibold">{title}</h3>
            </Link>

            <button onClick={handleDelete}
                className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-red-600"
            >
                <FaTrashAlt />
            </button>

        </div>
    )
};
