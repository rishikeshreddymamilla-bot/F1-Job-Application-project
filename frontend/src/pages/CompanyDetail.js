import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/companies/${id}`),
      api.get(`/reports/company/${id}`)
    ]).then(([companyRes, reportsRes]) => {
      setCompany(companyRes.data);
      setReports(reportsRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!company) return <p>Company not found</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>Location: {company.location}</p>
      <p>Industry: {company.industry}</p>
      <p>Sponsorship Score: {company.sponsorshipScore}</p>

      <h2>Reports</h2>
      {reports.length === 0 && <p>No reports yet.</p>}
      {reports.map(report => (
        <div key={report.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>Role: {report.role}</p>
          <p>Outcome: {report.outcome}</p>
          <p>Rejected due to visa: {report.rejectedDueToVisa ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyDetail;