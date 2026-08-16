import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getResourceById } from '../services/api';

const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const normalizeCategory = (category) => {
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

function ResourceDetails() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        const data = await getResourceById(id);
        setResource(data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to find this resource.');
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading) return <Loading message="Loading resource details..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!resource) return <ErrorMessage message="Resource not found." />;

  return (
    <div className="page-shell narrow-page">
      <div className="page-header-row detail-header">
        <div>
          <p className="section-label">Resource Details</p>
          <h1>{resource.title}</h1>
        </div>

        <div className="detail-actions">
          <Link to={`/resources/${resource._id}/edit`} className="secondary-btn light">
            Edit
          </Link>
          {resource.resourceLink && (
            <a href={resource.resourceLink} target="_blank" rel="noreferrer" className="primary-btn">
              Open Resource
            </a>
          )}
        </div>
      </div>

      <div className="panel detail-panel">
        <div className="detail-row">
          <span className="detail-label">Subject</span>
          <strong>{resource.subject}</strong>
        </div>

        <div className="detail-row">
          <span className="detail-label">Category</span>
          <span className="resource-category-text">{normalizeCategory(resource.category)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Description</span>
          <p>{resource.description || 'No description added.'}</p>
        </div>

        <div className="detail-row">
          <span className="detail-label">Resource Link</span>
          {resource.resourceLink ? (
            <a href={resource.resourceLink} target="_blank" rel="noreferrer">
              {resource.resourceLink}
            </a>
          ) : (
            <p>Not provided</p>
          )}
        </div>

        <div className="detail-row">
          <span className="detail-label">Created</span>
          <p>{formatDate(resource.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default ResourceDetails;
