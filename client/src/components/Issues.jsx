import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIssues, isLoading } from "state";
import { IssuesCard } from "./IssuesCard";
import { IssueModal } from "./IssueModal";
import { FaArrowLeft } from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiTimeTrap } from "react-icons/gi";
import { BsCollection } from "react-icons/bs";
import BarLoader from "react-spinners/BarLoader";


export const Issues = () => {

  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const issue = useSelector(state => state.issues);
  const project = useSelector(state => state.projects);
  const { projectId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();


  const loading = useSelector(state => state.isLoading);

  const getIssues = async () => {

    try {

      dispatch(isLoading(true));

      const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${projectId}/issues`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const data = await response.json();

      dispatch(setIssues({ projectId, issues: data }));

    } catch (error) {
      console.error("Error fetching projects:", error.message);
    } finally {
      dispatch(isLoading(false));
    };
  };

  useEffect(() => {
    getIssues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const projects = project.find(proj => proj._id === projectId);

  const hasIssues = issue[projectId] && issue[projectId].length > 0;

  const inProgressIssues = issue[projectId]?.filter(iss => iss.status === 'In-Progress') || [];
  const backlogIssues = issue[projectId]?.filter(iss => iss.status === 'Backlog') || [];
  const completedIssues = issue[projectId]?.filter(iss => iss.status === 'Completed') || [];



  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-full p-8 bg-gray-100">
          {loading ? (
            <BarLoader width={125} />
          ) : (hasIssues ?
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <button onClick={() => navigate('/dashboard')} className="hover:text-indigo-500 p-2 rounded" >
                    <FaArrowLeft />
                  </button>
                  <h2 className="flex items-center text-xl py-2 px-6 ml-2 rounded-lg bg-gray-300 font-semibold">
                    {projects?.title}
                    <BsFileEarmarkText className="ml-2" />
                  </h2>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                  + Add Issue
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8 items-start content-start">

                <div className="bg-red-300 p-4 rounded">
                  <div className="flex">
                    <h3 className="text-xl font-bold mb-4 mr-2">Backlog</h3>
                    <BsCollection className="w-6 h-6 mt-0.5" />
                  </div>
                  {backlogIssues.map(issueItem => (
                    <IssuesCard key={issueItem._id} title={issueItem.title} projectId={projectId} issueId={issueItem._id} createdDate={issueItem.createdAt} />
                  ))}
                </div>
                <div className="bg-orange-300 p-4 rounded">
                  <div className="flex">
                    <h3 className="text-xl font-bold mb-4 mr-2.5">In-Progress</h3>
                    <GiTimeTrap className="w-6 h-6 mt-0.5" />
                  </div>
                  {inProgressIssues.map(issueItem => (
                    <IssuesCard key={issueItem._id} title={issueItem.title} projectId={projectId} issueId={issueItem._id} createdDate={issueItem.createdAt} />
                  ))}
                </div>
                <div className="bg-green-400 p-4 rounded">
                  <div className="flex">
                    <h3 className="text-xl font-bold mb-4 mr-2">Completed</h3>
                    <IoMdCheckmarkCircleOutline className="w-6 h-6 mt-0.5" />
                  </div>
                  {completedIssues.map(issueItem => (
                    <IssuesCard key={issueItem._id} title={issueItem.title} projectId={projectId} issueId={issueItem._id} createdDate={issueItem.createdAt} />
                  ))}
                </div>
              </div>
            </> : <>
              <div className="flex flex-col items-center pb-32 justify-center h-screen">
                <div className="rounded-lg border p-12 bg-slate-200 text-center w-1/2 mb-32">
                  <p className="text-4xl mb-4">First time? Let's fix that.</p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-gray-600 text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                    + Create Issue
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isModalOpen && <IssueModal projectId={projectId} onClose={() => setModalOpen(false)} />}
    </>
  )
};
