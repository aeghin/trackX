import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditPage } from "./EditPage";
import { AiOutlineCloseCircle } from 'react-icons/ai';
export const IssueDetails = ({ projectId, issueId, closeModal }) => {

  // const navigate = useNavigate();
  // const { projectId, issueId } = useParams();

  const project = useSelector(state => state.issues[projectId]);

  const issues = project.find(issue => issue._id === issueId);

  const [isEditPage, setIsEditPage] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 relative">
      <button onClick={closeModal} className="absolute top-4 right-4 hover:text-red-600">
        <AiOutlineCloseCircle />
      </button>
        {/* <div className="w-full p-8">

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button onClick={() => navigate(`/projects/${projectId}/issues`)} className="hover:text-indigo-500 p-2 rounded">
              <FaArrowLeft />
            </button>
            <h2 className="text-xl py-2 px-6 ml-2 rounded-lg bg-gray-300 font-semibold">
              {issues.title}
            </h2>
          </div>
        </div>
      </div> */}
        {!isEditPage ?
          <div className="w-1/2 h-3/4 bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Title:</h3>
              <p className="text-base text-gray-700">{issues.title}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Description:</h3>
              <p className="text-base text-gray-700">{issues.description}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Status:</h3>
              <p className="text-base text-gray-700">{issues.status}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsEditPage(true)} className="bg-red-400 py-2 px-6 rounded-lg shadow-md hover:bg-indigo-100">Edit</button>
            </div>
          </div>
          :
          <EditPage issues={issues} issueId={issueId} projectId={projectId} closeModal={closeModal} />
        }
      </div>
    </div>
  )
};


