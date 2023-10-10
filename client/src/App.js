import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home/Home';
import Login from './scenes/Login/Login'
import Dashboard from './scenes/Dashboard/Dashboard';
import { Issues } from 'components/Issues';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/Navbar/Navbar';
import { IssueDetails } from 'components/IssueDetails';

import { Toaster } from 'sonner';
function App() {

  const authenticated = Boolean(useSelector((state) => state.token));
  
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects/:projectId/issues" element={<Issues />} />
          <Route path="/projects/:projectId/:issueId" element={<IssueDetails />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="bottom-center"/>
    </div>
  );
};

export default App;
