import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(payload);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <div className="list-group">
        {items.map((user) => (
          <div key={user.id || user._id || user.email} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h6 mb-1">{user.name || user.email}</h3>
                <p className="mb-1 text-muted">{user.email}</p>
                <small className="text-muted">{user.role} · {user.fitnessGoal || 'Fitness goal pending'}</small>
              </div>
              <span className="badge bg-primary">{user.level || 'member'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
