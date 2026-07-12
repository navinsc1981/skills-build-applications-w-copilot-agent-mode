import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Overview', exact: true },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
          <p className="lead text-muted mb-3">
            A modern multi-tier fitness and team tracking experience.
          </p>
          <p className="small text-muted mb-0">
            API base URL uses <code>VITE_CODESPACE_NAME</code> when present. Define it in <code>.env.local</code> to target Codespaces, otherwise the app falls back to localhost.
          </p>
          <div className="d-flex gap-2 flex-wrap mt-3">
            <span className="badge bg-primary">React 19</span>
            <span className="badge bg-success">Vite</span>
            <span className="badge bg-info text-dark">Express + TypeScript</span>
            <span className="badge bg-warning text-dark">MongoDB</span>
          </div>
          {codespaceName ? (
            <p className="small text-muted mt-3 mb-0">Codespace target: {codespaceName}</p>
          ) : (
            <p className="small text-muted mt-3 mb-0">No Codespace name configured; using localhost.</p>
          )}
        </div>
      </div>

      <nav className="nav nav-pills flex-wrap mb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<div className="row g-3"><div className="col-md-6"><div className="card h-100"><div className="card-body"><h2 className="h5">Welcome</h2><p className="text-muted mb-0">Browse users, teams, activities, leaderboard entries, and workouts from the OctoFit API.</p></div></div></div><div className="col-md-6"><div className="card h-100"><div className="card-body"><h2 className="h5">API mode</h2><p className="text-muted mb-0">The client uses environment-aware URLs and gracefully falls back to localhost when no Codespace name is set.</p></div></div></div></div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
