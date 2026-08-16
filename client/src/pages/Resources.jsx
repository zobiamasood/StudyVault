import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { deleteResource, getResources } from '../services/api';

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [deleteMessage, setDeleteMessage] = useState('');

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

  useEffect(() => {
    fetchResources();
  }, []);

  const normalizeCategory = (category) => {
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

    if (!category) return '';
    return categoryMap[String(category).trim().toLowerCase()] || String(category).trim();
  };

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const normalizedCategory = normalizeCategory(resource.category);
      const matchesType = selectedType === 'All' || normalizedCategory === selectedType;
      const searchValue = searchTerm.toLowerCase();
      const matchesSearch =
        resource.title.toLowerCase().includes(searchValue) ||
        resource.subject.toLowerCase().includes(searchValue) ||
        resource.description?.toLowerCase().includes(searchValue);

      return matchesType && matchesSearch;
    });
  }, [resources, searchTerm, selectedType]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this resource?');

    if (!confirmed) return;

    try {
      await deleteResource(id);
      setDeleteMessage('Resource deleted successfully.');
      setTimeout(() => setDeleteMessage(''), 2500);
      await fetchResources();
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || 'Unable to delete the resource.');
    }
  };

  if (loading) return <Loading message="Loading resources..." />;

  return (
    <div className="page-shell">
      <div className="page-header-row">
        <div>
          <p className="section-label">Library</p>
          <h1>Resources</h1>
        </div>

        <Link to="/resources/add" className="primary-btn">
          Add Resource
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}
      {deleteMessage && <div className="success-box">{deleteMessage}</div>}

      <div className="toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar selectedType={selectedType} onChange={setSelectedType} />
      </div>

      {filteredResources.length === 0 ? (
        <div className="empty-box large">
          <h3>No study resources yet.</h3>
          <p>Start by adding your first resource.</p>
          <Link to="/resources/add" className="primary-btn">
            Add Your First Resource
          </Link>
        </div>
      ) : (
        <div className="resource-grid">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Resources;
