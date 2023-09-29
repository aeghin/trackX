

export const IssuesCard = ({ title }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg transition duration-600 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 hover:text-white">
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
    )
};
