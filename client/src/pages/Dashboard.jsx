import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResources } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const normalizeResourceCategory = (category) => {
  if (!category) return '';

  const categoryMap = {
    'past paper': 'Past Papers',
    'past papers': 'Past Papers',
    'assignment': 'Assignment',
    'assignments': 'Assignment',
    'notes': 'Notes',
    'video': 'Video',
    'videos': 'Video',
    'document': 'Document',
    'documents': 'Document',
    'book': 'Document',
    'books': 'Document',
  };

  const trimmedCategory = String(category).trim();
  return categoryMap[trimmedCategory.toLowerCase()] || trimmedCategory;
};

function Dashboard() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await getResources();
        setResources(data);
        setError('');
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to load resources.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const stats = useMemo(() => {
    const counts = {
      total: resources.length,
      notes: 0,
      papers: 0,
      assignments: 0,
      other: 0,
    };

    resources.forEach((resource) => {
      const normalizedCategory = normalizeResourceCategory(resource.category);
      if (normalizedCategory === 'Notes') counts.notes += 1;
      if (normalizedCategory === 'Past Papers') counts.papers += 1;
      if (normalizedCategory === 'Assignment') counts.assignments += 1;
      if (!['Notes', 'Past Papers', 'Assignment'].includes(normalizedCategory)) counts.other += 1;
    });

    return counts;
  }, [resources]);

  const recentResources = resources.slice(0, 4);

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="page-shell">
      <section className="dashboard-welcome">
        <div className="welcome-content">
          <h1>Welcome back, {user?.name || 'Student'}!</h1>
          <p>Keep your study resources organized and easy to find.</p>
          <Link to="/resources/add" className="primary-btn">
            + Add Resource
          </Link>
        </div>
      </section>

      {error && <ErrorMessage message={error} />}

      <section className="stats-grid">
        <div className="stat-card total-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <span className="stat-label">Total Resources</span>
            <strong className="stat-value">{stats.total}</strong>
          </div>
        </div>
        <div className="stat-card notes-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <span className="stat-label">Notes</span>
            <strong className="stat-value">{stats.notes}</strong>
          </div>
        </div>
        <div className="stat-card papers-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <span className="stat-label">Past Papers</span>
            <strong className="stat-value">{stats.papers}</strong>
          </div>
        </div>
        <div className="stat-card assignments-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <span className="stat-label">Assignments</span>
            <strong className="stat-value">{stats.assignments}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="section-label">Recent updates</p>
            <h2>Recent Resources</h2>
          </div>
          <Link to="/resources" className="secondary-btn light">
            See all
          </Link>
        </div>

        <div className="recent-list">
          {recentResources.length === 0 ? (
            <div className="empty-box">
              <p>No study resources yet.</p>
              <Link to="/resources/add" className="primary-btn">
                Add Your First Resource
              </Link>
            </div>
          ) : (
            recentResources.map((resource) => {
              const normalizedCategory = normalizeResourceCategory(resource.category);
              const hasValidLink = Boolean(resource.resourceLink && resource.resourceLink.trim().length > 0);

              return (
                <div key={resource._id} className="recent-item">
                  <div className="recent-item-main">
                    <h3>{resource.title}</h3>
                    <p>{resource.subject}</p>
                  </div>

                  <div className="recent-item-actions">
                    {normalizedCategory && <span className="resource-category-text">{normalizedCategory}</span>}
                    {hasValidLink ? (
                      <a
                        href={resource.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-btn recent-link-btn"
                      >
                        View Resource
                      </a>
                    ) : (
                      <Link to={`/resources/${resource._id}`} className="secondary-btn recent-link-btn">
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
