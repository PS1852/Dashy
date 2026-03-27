import { useMemo } from 'react';
import { 
  Plus, FileText, CheckCircle, 
  TrendingUp, ChevronRight, Folder,
  MoreHorizontal, Trash2, Edit2,
  PieChart as PieIcon, BarChart3, Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ContextMenu } from '../ui/ContextMenu';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { 
    user, pages, projects, createPage, createProject, 
    setActivePageId, updateProject, deleteProject 
  } = useApp();

  const activePages = useMemo(() => pages.filter(p => !p.is_deleted), [pages]);
  const totalPages = activePages.length;
  const totalProjects = projects.length;
  const favoritePages = activePages.filter(p => p.is_favorite).length;
  
  const recentPages = useMemo(() => [...activePages]
    .sort((a, b) => new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime())
    .slice(0, 5), [activePages]);

  // 1. Calculate Productivity Label
  const productivity = useMemo(() => {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const modifiedRecent = activePages.filter(p => new Date(p.$updatedAt) > last24h).length;
    if (modifiedRecent >= 10) return 'Peak';
    if (modifiedRecent >= 5) return 'High';
    if (modifiedRecent >= 2) return 'Growing';
    return 'Steady';
  }, [activePages]);

  // 2. Calculate Growth Percentage
  const growth = useMemo(() => {
    const now = new Date();
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prev7d = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    // Pages created this week
    const countLast7d = activePages.filter(p => new Date(p.$createdAt) > last7d).length;
    // Pages created last week
    const countPrev7d = activePages.filter(p => {
      const d = new Date(p.$createdAt);
      return d > prev7d && d <= last7d;
    }).length;

    if (countPrev7d === 0) {
      if (countLast7d === 0) return '0%';
      return `+${countLast7d * 100}%`;
    }
    
    if (countLast7d === countPrev7d) return '0%';
    
    const pct = Math.round(((countLast7d - countPrev7d) / countPrev7d) * 100);
    return (pct >= 0 ? '+' : '') + pct + '%';
  }, [activePages]);

  const getPagesInProject = (projectId: string) => {
    return activePages.filter(p => p.project_id === projectId).length;
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
          trend={`${growth} from last week`}
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
          value={productivity} 
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
                <div key={project.$id} className="project-card">
                  <div className="project-card-icon" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                    {project.icon || <Folder size={18} />}
                  </div>
                  <div className="project-card-info">
                    <h3 className="project-card-name">{project.name}</h3>
                    <p className="project-card-count">{getPagesInProject(project.$id)} pages</p>
                  </div>
                  
                  <div className="project-card-actions">
                    <ContextMenu 
                      trigger={<MoreHorizontal size={14} />} 
                      triggerClassName="sidebar-icon-btn"
                      items={[
                        {
                          label: 'Rename',
                          icon: <Edit2 size={14} />,
                          onClick: () => {
                            const n = prompt('New name:', project.name);
                            if (n) updateProject(project.$id, { name: n });
                          }
                        },
                        {
                          label: 'Delete',
                          icon: <Trash2 size={14} />,
                          onClick: () => deleteProject(project.$id),
                          danger: true
                        }
                      ]}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Graphical Representation */}
          <div className="dashboard-analytics-section">
            <div className="section-header" style={{ marginTop: '40px' }}>
              <h2 className="section-title"><Activity size={18} style={{ marginRight: '8px' }}/> Workspace Analytics</h2>
            </div>
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="analytics-card-header">
                  <PieIcon size={14} /> <span>Project Distribution</span>
                </div>
                <div className="analytics-viz">
                  <PieChartViz data={projects.map(p => ({ label: p.name, value: getPagesInProject(p.$id) }))} />
                </div>
              </div>
              <div className="analytics-card">
                <div className="analytics-card-header">
                  <BarChart3 size={14} /> <span>Weekly Engagement</span>
                </div>
                <div className="analytics-viz">
                  <BarChartViz activePages={activePages} />
                </div>
              </div>
            </div>
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

function PieChartViz({ data }: { data: any[] }) {
  // Simple SVG Pie chart
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let currentAngle = 0;
  
  return (
    <div className="pie-chart-wrap">
      <svg width="120" height="120" viewBox="0 0 32 32">
        {data.length === 0 ? (
           <circle r="16" cx="16" cy="16" fill="#f0f0f0" />
        ) : data.map((d, i) => {
          const ratio = d.value / total;
          const angle = ratio * 360;
          const x1 = 16 + 16 * Math.cos((currentAngle - 90) * Math.PI / 180);
          const y1 = 16 + 16 * Math.sin((currentAngle - 90) * Math.PI / 180);
          currentAngle += angle;
          const x2 = 16 + 16 * Math.cos((currentAngle - 90) * Math.PI / 180);
          const y2 = 16 + 16 * Math.sin((currentAngle - 90) * Math.PI / 180);
          
          const largeArcFlag = ratio > 0.5 ? 1 : 0;
          const colors = ['var(--accent-primary)', '#8a8375', '#a39d8f', '#cfcac0'];
          
          return (
            <path 
              key={i}
              d={`M 16 16 L ${x1} ${y1} A 16 16 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={colors[i % colors.length]}
            />
          );
        })}
        <circle r="10" cx="16" cy="16" fill="var(--bg-primary)" />
      </svg>
      <div className="pie-legend">
        {data.slice(0, 3).map((d, i) => (
          <div key={i} className="legend-item">
            <span className="dot" style={{ background: ['var(--accent-primary)', '#8a8375', '#a39d8f'][i % 3] }} />
            <span className="name">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChartViz({ activePages }: { activePages: any[] }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const weekData = days.map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (today - i + 7) % 7);
    return activePages.filter(p => new Date(p.$updatedAt).toDateString() === d.toDateString()).length;
  });
  
  const max = Math.max(...weekData, 1);

  return (
    <div className="bar-chart-wrap">
      {weekData.map((val, i) => (
        <div key={i} className="bar-item">
          <div className="bar-track">
            <motion.div 
              className="bar-fill" 
              initial={{ height: 0 }}
              animate={{ height: `${(val / max) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="bar-label">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}
