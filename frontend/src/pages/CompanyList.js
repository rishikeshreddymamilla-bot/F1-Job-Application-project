import { useEffect, useState } from 'react';
import api from '../api';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/companies')
      .then(res => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load companies');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Companies</h1>
      {companies.length === 0 && <p>No companies yet.</p>}
      {companies.map(company => (
        <div key={company.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{company.name}</h2>
          <p>Location: {company.location}</p>
          <p>Industry: {company.industry}</p>
          <p>Sponsorship Score: {company.sponsorshipScore}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;