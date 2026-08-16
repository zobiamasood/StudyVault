import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResourceForm from '../components/ResourceForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getResourceById, updateResource } from '../services/api';

function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        const data = await getResourceById(id);
        setResource(data);
        setError('');
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to find this resource.');
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSaving(true);
      setError('');
      await updateResource(id, formData);
      navigate('/resources');
    } catch (updateError) {
      setError(updateError.response?.data?.message || 'Unable to update resource.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <Loading message="Loading resource details..." />;
  if (!resource) return <ErrorMessage message={error || 'Resource not found.'} />;

  return (
    <div className="page-shell narrow-page">
      <div className="page-header-row">
        <div>
          <p className="section-label">Update</p>
          <h1>Edit Resource</h1>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="panel form-panel">
        <ResourceForm
          initialData={resource}
          onSubmit={handleSubmit}
          submitLabel="Update Resource"
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}

export default EditResource;
