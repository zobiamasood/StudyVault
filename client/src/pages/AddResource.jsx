import { useNavigate } from 'react-router-dom';
import ResourceForm from '../components/ResourceForm';
import { createResource } from '../services/api';
import { useState } from 'react';

function AddResource() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData) => {
    try {
      setIsSaving(true);
      setErrorMessage('');
      await createResource(formData);
      navigate('/resources');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to add resource.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-shell narrow-page">
      <div className="page-header-row">
        <div>
          <p className="section-label">Create</p>
          <h1>Add Resource</h1>
        </div>
      </div>

      {errorMessage && <div className="state-box error-box">{errorMessage}</div>}

      <div className="panel form-panel">
        <ResourceForm onSubmit={handleSubmit} submitLabel="Add Resource" isLoading={isSaving} />
      </div>
    </div>
  );
}

export default AddResource;
