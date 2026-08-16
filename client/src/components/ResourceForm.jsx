import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  subject: '',
  category: 'Notes',
  description: '',
  resourceLink: '',
};

function ResourceForm({ initialData = emptyForm, onSubmit, submitLabel = 'Save Resource', isLoading = false }) {
  const [formData, setFormData] = useState(initialData);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title?.trim()) {
      setValidationError('Title is required.');
      return;
    }

    if (!formData.subject?.trim()) {
      setValidationError('Subject is required.');
      return;
    }

    if (!formData.category?.trim()) {
      setValidationError('Category is required.');
      return;
    }

    if (formData.resourceLink && formData.resourceLink.trim()) {
      try {
        new URL(formData.resourceLink.trim());
      } catch {
        setValidationError('Please enter a valid resource URL.');
        return;
      }
    }

    setValidationError('');
    onSubmit(formData);
  };

  return (
    <form className="resource-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="e.g. JavaScript Notes"
          />
        </div>

        <div className="field-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject || ''}
            onChange={handleChange}
            placeholder="e.g. Web Development"
          />
        </div>

        <div className="field-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category || 'Notes'} onChange={handleChange}>
            <option value="Notes">Notes</option>
            <option value="Assignment">Assignment</option>
            <option value="Past Papers">Past Papers</option>
            <option value="Video">Video</option>
            <option value="Document">Document</option>
          </select>
        </div>

        <div className="field-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Add a short summary of the resource"
          />
        </div>

        <div className="field-group full-width">
          <label htmlFor="resourceLink">Resource Link</label>
          <input
            id="resourceLink"
            name="resourceLink"
            type="text"
            value={formData.resourceLink || ''}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>
      </div>

      {validationError && <div className="field-error">{validationError}</div>}

      <div className="form-actions">
        <button type="submit" className="primary-btn" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ResourceForm;
