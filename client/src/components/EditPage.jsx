

export const EditPage = ({ issues }) => {
    return (
        <div className="w-1/2 h-3/4 bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
                <h3 className="text-lg font-medium">Title:</h3>
                <input type="text" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" placeholder={issues.title} />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Description:</h3>
                <textarea className="resize-y border rounded w-full py-2 px-3 text-gray-700 leading-tight" placeholder={issues.description}></textarea>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium">Status:</h3>
                <select className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" defaultValue={issues.status}>
                    <option value="" disabled>Select status</option>
                    <option>Back-log</option>
                    <option>In-progress</option>
                    <option>Completed</option>
                </select>
            </div>
        </div>
    );
};
