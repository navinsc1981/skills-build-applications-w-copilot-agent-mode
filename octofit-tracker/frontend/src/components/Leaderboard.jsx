import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(payload);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {items.map((entry) => (
          <div key={entry.id || entry._id || entry.user} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h6 mb-1">{entry.user}</h3>
              <p className="mb-0 text-muted">Streak: {entry.streak} days</p>
            </div>
            <span className="badge bg-success">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
