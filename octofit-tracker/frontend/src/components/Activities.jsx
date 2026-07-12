import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(payload);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="list-group">
        {items.map((activity) => (
          <div key={activity.id || activity._id || activity.type} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="h6 mb-1">{activity.type}</h3>
                <p className="mb-0 text-muted">{activity.durationMinutes} min · {activity.calories} kcal</p>
              </div>
              <span className="badge bg-info text-dark">{new Date(activity.date || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
