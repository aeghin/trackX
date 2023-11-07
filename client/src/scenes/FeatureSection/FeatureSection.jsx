import image from '../../assets/Dashboard.png';

export const FeatureSection = () => {
    return (
        <div className="bg-white flex flex-col lg:flex-row justify-between items-stretch p-8">
            <div className="w-1/2 h-1/4">
                <h2 className="text-xl font-semibold mb-4">Manage projects with ease.</h2>
                <ul className="space-y-4">
                    <li>
                        <strong>Create Projects:</strong> Kickstart your new ventures and outline your objectives and milestones.
                    </li>
                    <li>
                        <strong>Add Issues:</strong> Identify challenges and tasks associated with each project.
                    </li>
                    <li>
                        <strong>Track by Status:</strong> Organize and monitor your tasks as they progress from 'To-Do' to 'In Progress' to 'Complete'.
                    </li>
                    <li>
                        <strong>Easy Management:</strong> Add or remove projects and issues with a user-friendly interface.
                    </li>
                    <li>
                        <strong>Centralized Tracking:</strong> Have a single, organized space to view all your ongoing projects and their associated tasks.
                    </li>
                </ul>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-12">

                <img src={image} alt="Visual representation of features" className="w-full h-40 rounded-lg shadow-md object-cover border-b-4 border-indigo-300" />
            </div>
        </div>
    );
};
