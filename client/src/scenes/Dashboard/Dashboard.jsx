import Navbar from "scenes/Navbar/Navbar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "state";


const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects) || [];
  const token = useSelector((state) => state.token);

  const getProjects = async () => {
    const response = await fetch("http://localhost:3001/projects/projects",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

    const data = await response.json();
 
    dispatch(setProjects(data))
  };

  useEffect(() => {
    getProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <div className="flex justify-center">Dashboard only if logged in</div>
      {projects.map(({ _id, title }) => (
        <ul>
          <li key={_id}>{title}</li>
        </ul>
      )
      )}
    </>
  )
};

export default Dashboard