import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './scenes/Home/Home';
import { Form } from 'scenes/Login/Form';
import Dashboard from './scenes/Dashboard/Dashboard';
import { Issues } from 'components/Issues';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/Navbar/Navbar';
import { Footer } from 'scenes/Footer/Footer';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

function App() {

  const authenticated = Boolean(useSelector((state) => state.token));

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };


  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={authenticated ? <Dashboard /> : <Home />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Form />} />
          <Route path="/projects/:projectId/issues" element={authenticated ? <Issues /> : <Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster richColors position="bottom-center" />
    </div>
  );
};

export default App;
