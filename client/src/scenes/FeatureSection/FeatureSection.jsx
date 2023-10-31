import image from '../../assets/Dashboard.png';

export const FeatureSection = () => {
    return (
        <div className="bg-white flex flex-col lg:flex-row justify-between items-center p-12">
            <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Manage projects with ease.</h2>
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
            <div className="lg:w-1/2 mt-8 lg:mt-0">

                <img src={image} alt="Visual representation of features" className="w-full h-[100px] lg:h-[200px] rounded-lg shadow-md object-cover" />
            </div>
        </div>
    );
};
