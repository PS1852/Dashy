import { 
  Plus, FileText, CheckCircle, 
  TrendingUp, ChevronRight, Folder
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Dashboard() {
  const { 
    user, pages, projects, pageProjectMap, createPage, createProject, setActivePageId 
  } = useApp();

  const totalPages = pages.length;
  const totalProjects = projects.length;
  const favoritePages = pages.filter(p => p.is_favorite).length;
  
  const recentPages = [...pages]
    .sort((a, b) => new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime())
    .slice(0, 5);

  const getPagesInProject = (projectId: string) => {
    return pages.filter(p => pageProjectMap[p.$id] === projectId).length;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-intro">
          <h1 className="dashboard-title">Good afternoon, {user?.name?.split(' ')[0] || 'Atelier'}</h1>
          <p className="dashboard-subtitle">Here's what's happening in your digital workspace.</p>
        </div>
        <div className="dashboard-actions">
          <button className="dashboard-action-btn primary" onClick={() => createPage()}>
            <Plus size={16} /> New Page
          </button>
        </div>
      </header>

      <section className="dashboard-stats-grid">
        <StatCard 
          icon={<FileText size={20} />} 
          label="Total Pages" 
          value={totalPages} 
          trend="+12% from last week"
        />
        <StatCard 
          icon={<Folder size={20} />} 
          label="active projects" 
          value={totalProjects} 
        />
        <StatCard 
          icon={<CheckCircle size={20} />} 
          label="favorites" 
          value={favoritePages} 
        />
        <StatCard 
          icon={<TrendingUp size={20} />} 
          label="productivity" 
          value="High" 
          isBadge
        />
      </section>

      <div className="dashboard-content-grid">
        {/* Project Collections */}
        <div className="dashboard-section project-collection">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <button className="section-link" onClick={() => createProject()}>
              <Plus size={14} /> New Project
            </button>
          </div>
          <div className="project-grid">
            {projects.length === 0 ? (
              <div className="project-card empty">
                <p>No projects yet.</p>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-icon" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                    {project.icon || <Folder size={18} />}
                  </div>
                  <div className="project-card-info">
                    <h3 className="project-card-name">{project.name}</h3>
                    <p className="project-card-count">{getPagesInProject(project.id)} pages</p>
                  </div>
                  <div className="project-card-chart">
                    <MiniChart color={project.color} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section recent-activity">
          <div className="section-header">
            <h2 className="section-title">Recent Pages</h2>
          </div>
          <div className="activity-list">
            {recentPages.length === 0 ? (
              <p className="empty-text">No recently edited pages.</p>
            ) : (
              recentPages.map(page => (
                <button 
                  key={page.$id} 
                  className="activity-item"
                  onClick={() => setActivePageId(page.$id)}
                >
                  <span className="activity-icon">{page.icon || '📄'}</span>
                  <div className="activity-info">
                    <span className="activity-name">{page.title || 'Untitled'}</span>
                    <span className="activity-time">{new Date(page.$updatedAt).toLocaleDateString()}</span>
                  </div>
                  <ChevronRight size={14} className="activity-arrow" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <div className="stat-value-group">
          <span className="stat-value">{value}</span>
          {trend && <span className="stat-trend">{trend}</span>}
        </div>
      </div>
    </div>
  );
}

function MiniChart({ color }: { color?: string }) {
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M2 20C2 20 8 12 12 14C16 16 22 4 28 8C34 12 40 2 48 6C56 10 58 14 58 14" 
        stroke={color || "#615e57"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
