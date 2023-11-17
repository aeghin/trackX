import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home/Home';
import { Form } from 'scenes/Login/Form';
import Dashboard from './scenes/Dashboard/Dashboard';
import { Issues } from 'components/Issues';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/Navbar/Navbar';
// import { IssueDetails } from 'components/IssueDetails';

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
          <Route path="/login" element={<Form />} />
          <Route path="/projects/:projectId/issues" element={authenticated ? <Issues /> : <Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="bottom-center" />
    </div>
  );
};

export default App;
