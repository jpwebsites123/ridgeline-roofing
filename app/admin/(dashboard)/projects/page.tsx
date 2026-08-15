import { PROJECTS } from '@/lib/projects-data';

export default function AdminProjectsPage() {
  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Project Gallery</h2>
        <span className="admin-pill">{PROJECTS.length} projects</span>
      </div>
      <div className="admin-panel-body">
        <table className="admin-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Type</th>
              <th>Material</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p) => (
              <tr key={p.id}>
                <td>{p.city}</td>
                <td>{p.type}</td>
                <td>{p.material}</td>
                <td className="muted">{p.duration}</td>
                <td>
                  <button className="admin-btn admin-btn-outline admin-btn-sm" disabled title="Coming soon">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '18px 24px', borderTop: '1px solid var(--line)' }}>
        <p style={{ fontSize: 13, color: 'var(--steel)' }}>
          Project data currently comes from the site&rsquo;s codebase. Full editing here
          (including photo upload) is the next step once this moves past the demo stage.
        </p>
      </div>
    </div>
  );
}
