import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RESOURCE_CATEGORIES } from '../utils/resource';

const emptyForm = { title: '', subject: '', category: 'Notes', description: '', resourceLink: '' };

function ResourceFormModern({ initialData = emptyForm, onSubmit, submitLabel = 'Save Resource', isLoading = false }) {
  const [formData, setFormData] = useState({ ...emptyForm, ...initialData });
  const [validationError, setValidationError] = useState('');
  const handleChange = (event) => { const { name, value } = event.target; setFormData((prev) => ({ ...prev, [name]: value })); setValidationError(''); };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim()) return setValidationError('Title is required.');
    if (!formData.subject.trim()) return setValidationError('Subject is required.');
    if (!formData.category.trim()) return setValidationError('Category is required.');
    if (formData.resourceLink.trim()) { try { new URL(formData.resourceLink.trim()); } catch { return setValidationError('Please enter a valid resource URL.'); } }
    onSubmit(formData);
  };
  const inputClass = 'mt-2 w-full rounded-xl border border-deep-teal/10 bg-warm-cream/40 px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-muted-slate/60 focus:border-deep-teal/40 focus:bg-white focus:ring-4 focus:ring-sage/20';
  return <form onSubmit={handleSubmit} className="space-y-6"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-deep-teal">Title *<input className={inputClass} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. JavaScript Fundamentals" disabled={isLoading} /></label><label className="text-sm font-semibold text-deep-teal">Subject *<input className={inputClass} name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. Web Development" disabled={isLoading} /></label><label className="text-sm font-semibold text-deep-teal">Category *<select className={inputClass} name="category" value={formData.category} onChange={handleChange} disabled={isLoading}>{RESOURCE_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label><label className="text-sm font-semibold text-deep-teal">Resource URL<input className={inputClass} name="resourceLink" value={formData.resourceLink} onChange={handleChange} placeholder="https://example.com" disabled={isLoading} /></label><label className="text-sm font-semibold text-deep-teal sm:col-span-2">Description<textarea className={`${inputClass} min-h-36 resize-y`} name="description" value={formData.description} onChange={handleChange} placeholder="Add a short summary to help you find this resource later." disabled={isLoading} /></label></div>{validationError && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{validationError}</p>}<div className="flex flex-wrap items-center justify-end gap-3 border-t border-deep-teal/10 pt-5"><Link to="/resources" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-slate transition hover:bg-warm-cream hover:text-deep-teal">Cancel</Link><button type="submit" disabled={isLoading} className="rounded-lg bg-muted-gold px-5 py-2.5 text-sm font-semibold text-deep-teal shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-hover hover:text-white disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Saving...' : submitLabel}</button></div></form>;
}
export default ResourceFormModern;
