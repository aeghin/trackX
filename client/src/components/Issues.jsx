import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIssues } from "state";
import { IssuesCard } from "./IssuesCard";
export const Issues = () => {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const issue = useSelector(state => state.issues);
  const project = useSelector(state => state.projects);
  const { projectId } = useParams();
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

  return (
    <div className="min-h-screen flex">
      <div className="w-full p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl py-2 px-6 rounded-lg bg-gray-300 font-semibold">{projects.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {issue && issue[projectId] && issue[projectId].map((issueItem) => (
            <IssuesCard key={issueItem._id} title={issueItem.title} />  
          ))}
        </div>
      </div>
    </div>
  )
};
