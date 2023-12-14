import { AiOutlineCloseCircle } from 'react-icons/ai';

export const ConfirmModal = ({ handleDelete, onClose }) => {


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-600">
                    <AiOutlineCloseCircle className="text-xl" />
                </button>
                <p className="text-red-500 text-2xl mb-2">WARNING</p>
                <p className="text-xl mb-4">Deleting the project will also remove its issues. Are you sure? This action cannot be undone.</p>
                <div className="flex">

                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white p-2 hover:bg-red-700 rounded mr-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 p-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
};
