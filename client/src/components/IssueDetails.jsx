import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const IssueDetails = () => {

  const navigate = useNavigate();
  const { projectId, issueId } = useParams();

  const project = useSelector(state => state.issues[projectId]);

  const issues = project.find(issue => issue._id === issueId);

  return (
    <div className="min-h-screen flex">
      <div className="w-full p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button onClick={() => navigate(`/projects/${projectId}/issues`)} className="hover:text-indigo-500 p-2 rounded" >
              <FaArrowLeft />
            </button>
            <h2 className="text-xl py-2 px-6 ml-2 rounded-lg bg-gray-300 font-semibold">
              {issues.title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
};


