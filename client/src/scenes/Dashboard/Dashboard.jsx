
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "state";
import { ProjectCard } from "components/ProjectCard.jsx";
import { Modal } from "components/Modal.jsx";
import { FaRegFolder } from 'react-icons/fa';


// import { FaArrowRight, FaArrowLeft, FaProjectDiagram, FaCog } from 'react-icons/fa';


const Dashboard = () => {

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const token = useSelector((state) => state.token);
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useSelector(state => state.user);


  const getProjects = async () => {

    const userId = user._id;


    const response = await fetch(`${process.env.REACT_APP_API_URL}projects/projects/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

    const data = await response.json();
    // console.log(data);
    dispatch(setProjects(data));
  };

  useEffect(() => {
    getProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const hasProjects = projects.length === 0;


  return (
    <>

      <div className="min-h-screen flex">


        <div className="w-full p-8 bg-gray-100">
          {hasProjects ? (

            <div className="flex flex-col items-center pb-32 justify-center h-screen">
              <div className="rounded-lg border p-12 bg-slate-200 text-center w-1/2">
                <p className="text-4xl mb-4">Start a project</p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-gray-600 text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                  + Create Project
                </button>
              </div>
            </div>
          ) : (

            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex">
                  <div className="flex items-center text-xl py-2 px-6 rounded-lg bg-gray-300 font-semibold">
                    <h2>PROJECTS</h2>
                    <FaRegFolder className="ml-2" />
                  </div>
                </div>
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
            </>
          )}
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </>
  )
};

export default Dashboard