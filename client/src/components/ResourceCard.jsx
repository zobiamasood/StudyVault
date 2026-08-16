import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

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

function ResourceCard({ resource, onDelete }) {
  const hasValidLink = Boolean(resource.resourceLink && resource.resourceLink.trim().length > 0);
  const normalizedCategory = normalizeResourceCategory(resource.category);

  const handleOpenResource = () => {
    if (hasValidLink) {
      window.open(resource.resourceLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="resource-card">
      <div className="card-header">
        <div className="card-title-section">
          <p className="resource-subject">{resource.subject}</p>
          <h3 className="resource-title">{resource.title}</h3>
        </div>
        {normalizedCategory && (
          <span className="resource-category-text" title={normalizedCategory}>
            {normalizedCategory}
          </span>
        )}
      </div>

      <p className="resource-description">
        {resource.description || 'No description provided.'}
      </p>

      <div className="card-footer">
        <span className="card-date">
          <time dateTime={resource.createdAt}>{formatDate(resource.createdAt)}</time>
        </span>

        {hasValidLink && (
          <button
            type="button"
            className="open-resource-link"
            onClick={handleOpenResource}
            title="Open this resource"
            aria-label="Open resource"
          >
            View Resource
          </button>
        )}
      </div>

      <div className="card-actions">
        <Link to={`/resources/${resource._id}`} className="action-btn view-btn" title="View resource details">
          View Details
        </Link>
        <Link to={`/resources/${resource._id}/edit`} className="action-btn edit-btn" title="Edit this resource">
          Edit
        </Link>
        <button
          type="button"
          className="action-btn delete-btn"
          onClick={() => {
            if (window.confirm('Delete this resource? This cannot be undone.')) {
              onDelete(resource._id);
            }
          }}
          title="Delete this resource permanently"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ResourceCard;
