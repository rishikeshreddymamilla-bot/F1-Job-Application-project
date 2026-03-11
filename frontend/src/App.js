
import { useState } from 'react';
import CompanyList from './pages/CompanyList';
import SubmitReport from './pages/SubmitReport';
import Login from './pages/Login';

function App() {
  const [page, setPage] = useState('companies');

  return (
    <div>
      <nav>
        <button onClick={() => setPage('companies')}>Companies</button>
        <button onClick={() => setPage('submit')}>Submit Report</button>
        <button onClick={() => setPage('login')}>Login</button>
      </nav>

      {page === 'companies' && <CompanyList />}
      {page === 'submit' && <SubmitReport />}
      {page === 'login' && <Login />}
    </div>
  );
}

export default App;