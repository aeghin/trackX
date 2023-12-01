import image from '../../assets/Dashboard.png';
import issueImg from '../../assets/IssueDetails.png'

export const FeatureSection = () => {
    return (
        <div className="h-screen bg-white flex flex-col lg:flex-row justify-center items-center p-8 space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col justify-center items-start lg:items-center w-full lg:w-1/2 h-full">
                <h2 className="text-6xl font-semibold text-gray-800 mb-12">Manage projects with <span className='text-indigo-600'>ease.</span></h2>
                <ul className="text-2xl space-y-6 text-gray-600">
                    <li>
                        <strong className='text-indigo-600'>Create Projects:</strong> Kickstart your new ventures and outline your objectives and milestones.
                    </li>
                    <li>
                        <strong className='text-indigo-600'>Add Issues:</strong> Identify challenges and tasks associated with each project.
                    </li>
                    <li>
                        <strong className='text-indigo-600'>Track by Status:</strong> Organize and monitor your tasks as they progress from 'Backlog' to 'In-Progress' to 'Completed'.
                    </li>
                    <li>
                        <strong className='text-indigo-600'>Easy Management:</strong> Add or remove projects and issues with a user-friendly interface.
                    </li>
                    <li>
                        <strong className='text-indigo-600'>Centralized Tracking:</strong> Have a single, organized space to view all your ongoing projects and their associated tasks.
                    </li>
                </ul>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center space-y-14">
                <img src={image} alt="Visual representation of features" className="rounded-lg shadow-lg object-cover border-2 border-indigo-300 hover:shadow-xl transition-shadow duration-300" />
                <img src={issueImg} alt="Visual representation of features" className="rounded-lg shadow-lg object-cover border-2 border-indigo-300 hover:shadow-xl transition-shadow duration-300" />
            </div>
        </div>
    );
};
