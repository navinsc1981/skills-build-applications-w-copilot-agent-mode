function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness and team tracking experience.
              </p>
              <div className="d-flex gap-3 mt-4">
                <span className="badge bg-primary">React 19</span>
                <span className="badge bg-success">Vite</span>
                <span className="badge bg-info text-dark">Express + TypeScript</span>
                <span className="badge bg-warning text-dark">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
