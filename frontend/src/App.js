import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CompanyList from './pages/CompanyList';
import SubmitReport from './pages/SubmitReport';
import Login from './pages/Login';
import Register from './pages/Register';
import CompanyDetail from './pages/CompanyDetail';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Companies</Link> |
        <Link to="/submit"> Submit Report</Link> |
        <Link to="/login"> Login</Link> |
        <Link to="/register"> Register</Link>
      </nav>

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