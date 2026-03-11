import { useState, useEffect } from 'react';
import api from '../api';

function SubmitReport() {
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [role, setRole] = useState('');
  const [outcome, setOutcome] = useState('hired');
  const [rejectedDueToVisa, setRejectedDueToVisa] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/companies').then(res => setCompanies(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await api.post('/reports', {
        companyId,
        role,
        outcome,
        rejectedDueToVisa
      });
      setMessage(`Report submitted! New score: ${res.data.newScore}`);
    } catch (err) {
      setMessage('Failed to submit report');
    }
  };

  return (
    <div>
      <h1>Submit Report</h1>

      <select value={companyId} onChange={e => setCompanyId(e.target.value)}>
        <option value="">Select a company</option>
        {companies.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <br />
      <input
        type="text"
        placeholder="Role (e.g. Software Engineer)"
        value={role}
        onChange={e => setRole(e.target.value)}
      />

      <br />
      <select value={outcome} onChange={e => setOutcome(e.target.value)}>
        <option value="hired">Hired</option>
        <option value="rejected">Rejected</option>
        <option value="no_response">No Response</option>
      </select>

      <br />
      <label>
        <input
          type="checkbox"
          checked={rejectedDueToVisa}
          onChange={e => setRejectedDueToVisa(e.target.checked)}
        />
        Rejected due to visa?
      </label>

      <br />
      <button onClick={handleSubmit}>Submit Report</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SubmitReport;