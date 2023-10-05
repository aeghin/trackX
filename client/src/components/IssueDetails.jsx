import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";



export const IssueDetails = () => {

  const { projectId, issueId } = useParams();

  const project = useSelector(state => state.issues[projectId]);

  const issues = project.find(issue => issue._id === issueId);



  return (
    <div className="min-h-screen flex">
      <div className="w-full p-8 bg-gray-100">
        <h2 className="text-xl py-2 px-6 rounded-lg bg-gray-300 font-semibold">{issues.title}</h2>
      </div>
    </div>
  )
};


