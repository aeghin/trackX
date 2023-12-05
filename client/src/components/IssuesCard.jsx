import { FaTrashAlt } from 'react-icons/fa';
import { deleteIssue } from 'state';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { IssueDetails } from './IssueDetails';

export const IssuesCard = ({ title, projectId, issueId }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const [isModal, setIsModal] = useState(false);

    const handleDelete = async () => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${projectId}/${issueId}`,
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

    // const formattedDate = createdDate.slice(0, 10);

    return (
        <>
            <div className="flex justify-between items-center bg-white p-4 mb-3 rounded-lg shadow-lg transition duration-600 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:bg-gray-100">
                <div className="flex flex-grow items-center">
                    <button onClick={() => setIsModal(true)} className="flex-grow">
                        <h3 className="text-xl font-semibold">{title}</h3>
                    </button>
                </div>
                <button onClick={handleDelete}
                    className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-red-500"
                >
                    <FaTrashAlt />
                </button>
            </div>
            {isModal && <IssueDetails projectId={projectId} issueId={issueId} closeModal={() => setIsModal(false)} />}
        </>
    )
};
