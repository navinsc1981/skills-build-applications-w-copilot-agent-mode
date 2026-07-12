import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(payload);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row g-3">
        {items.map((team) => (
          <div key={team.id || team._id || team.name} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{team.name}</h3>
                <p className="text-muted mb-2">{team.goal}</p>
                <p className="mb-1"><strong>Members:</strong> {team.members}</p>
                <p className="mb-0"><strong>Focus:</strong> {team.focus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
