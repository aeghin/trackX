import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export const Issues = () => {
  const token = useSelector(state => state.token);
  const [issue, setIssue] = useState([]);
  const { projectId } = useParams();
  const getIssues = async () => {
    const response = await fetch(`http://localhost:3001/projects/${projectId}/issues`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getIssues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>Issues will be rendered here.</div>
  )
};
