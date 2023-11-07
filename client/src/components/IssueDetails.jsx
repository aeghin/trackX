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
      <div className="bg-white p-10 rounded-lg w-96 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 hover:text-red-600">
          <AiOutlineCloseCircle className="text-xl" />
        </button>
        {!isEditPage ?
          <div>
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
            <div className="flex">
              <button onClick={() => setIsEditPage(true)} className="bg-indigo-100 py-2 px-6 rounded-lg shadow-md hover:bg-red-400">Edit</button>
            </div>
          </div>
          :
          <EditPage issues={issues} issueId={issueId} projectId={projectId} closeModal={closeModal} goBack={() => setIsEditPage(false)}/>
        }
      </div>
    </div>
  )
};


