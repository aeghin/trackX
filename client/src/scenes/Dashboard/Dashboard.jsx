
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject, setProjects } from "state";
import { ProjectCard } from "components/ProjectCard.jsx";
import { Modal } from "components/Modal.jsx";

// import { FaArrowRight, FaArrowLeft, FaProjectDiagram, FaCog } from 'react-icons/fa';


const Dashboard = () => {

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const token = useSelector((state) => state.token);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const getProjects = async () => {
    const response = await fetch("http://localhost:3001/projects/projects",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

    const data = await response.json();
    // console.log(data);
    dispatch(setProjects(data));
  };

  useEffect(() => {
    getProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(projects.data);
  const handleProjectAdded = (newProject) => {
    dispatch(addProject(newProject))
  }
  // console.log(projects);
  return (
    <>

      <div className="min-h-screen flex">

        {/* Main Content */}
        <div className="w-full p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl py-2 px-6 rounded-lg bg-gray-300 font-semibold">PROJECTS</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
              + Create Project
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(({ title, _id }) => (
              <ProjectCard key={_id} title={title} projectId={_id} />
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onProjectAdded={handleProjectAdded} onClose={() => setModalOpen(false)} />}
    </>
  )
};

export default Dashboard