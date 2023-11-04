import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIssues } from "state";
import { IssuesCard } from "./IssuesCard";
import { IssueModal } from "./IssueModal";
import { FaArrowLeft } from "react-icons/fa";



export const Issues = () => {

  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const issue = useSelector(state => state.issues);
  const project = useSelector(state => state.projects);
  const { projectId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();


  const getIssues = async () => {
    const response = await fetch(`http://localhost:3001/projects/${projectId}/issues`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const data = await response.json();
      // console.log(data);
    dispatch(setIssues({ projectId, issues: data }))
  };

  useEffect(() => {
    getIssues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const projects = project.find(proj => proj._id === projectId);


  const inProgressIssues = issue[projectId]?.filter(iss => iss.status === 'In-Progress') || [];
  const backlogIssues = issue[projectId]?.filter(iss => iss.status === 'Back-log') || [];
  const completedIssues = issue[projectId]?.filter(iss => iss.status === 'Completed') || [];



  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-full p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button onClick={() => navigate('/dashboard')} className="hover:text-indigo-500 p-2 rounded" >
                <FaArrowLeft />
              </button>
              <h2 className="text-xl py-2 px-6 ml-2 rounded-lg bg-gray-300 font-semibold">
                {projects?.title}
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
              <h3 className="text-xl font-bold mb-4">Backlog</h3>
              {backlogIssues.map(issueItem => (
                <IssuesCard key={issueItem._id} title={issueItem.title} projectId={projectId} issueId={issueItem._id} createdDate={issueItem.createdAt} />
              ))}
            </div>
            <div className="bg-orange-300 p-4 rounded">
              <h3 className="text-xl font-bold mb-4">In-Progress</h3>
              {inProgressIssues.map(issueItem => (
                <IssuesCard key={issueItem._id} title={issueItem.title} projectId={projectId} issueId={issueItem._id} createdDate={issueItem.createdAt} />
              ))}
            </div>
            <div className="bg-green-400 p-4 rounded">
              <h3 className="text-xl font-bold mb-4">Completed</h3>
              {completedIssues.map(issueItem => (
                <IssuesCard key={issueItem._id} title={issueItem.title} projectId={projectId} issueId={issueItem._id} createdDate={issueItem.createdAt} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <IssueModal projectId={projectId} onClose={() => setModalOpen(false)} />}
    </>
  )
};
