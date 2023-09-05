import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home/Home';
import Login from './scenes/Login/Login'
import Dashboard from './scenes/Dashboard/Dashboard';
import { useSelector } from 'react-redux';



function App() {

  const authenticated = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
