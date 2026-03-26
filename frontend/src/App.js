import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import CompanyList from './pages/CompanyList';
import SubmitReport from './pages/SubmitReport';
import Login from './pages/Login';
import Register from './pages/Register';
import CompanyDetail from './pages/CompanyDetail';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  return (
    <nav>
      <Link to="/">Companies</Link> |
      <Link to="/submit"> Submit Report</Link> |
      {token ? (
        <button onClick={handleLogout}> Logout</button>
      ) : (
        <>
          <Link to="/login"> Login</Link> |
          <Link to="/register"> Register</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;