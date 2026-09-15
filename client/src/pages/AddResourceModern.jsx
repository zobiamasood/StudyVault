import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import ResourceFormModern from '../components/ResourceFormModern';
import ErrorMessageModern from '../components/ErrorMessageModern';
import { createResource } from '../services/api';

function AddResourceModern() {
  const navigate = useNavigate(); const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  const handleSubmit = async (data) => { try { setSaving(true); await createResource(data); navigate('/resources'); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to add resource. Please try again.'); } finally { setSaving(false); } };
  return <div className="mx-auto max-w-4xl space-y-7"><Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-slate hover:text-deep-teal"><ArrowLeft size={16} /> Back to resources</Link><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-slate">Build your library</p><h1 className="mt-2 font-display text-4xl font-semibold text-deep-teal">Add a new resource</h1><p className="mt-2 text-sm text-muted-slate">Capture the material now so it is ready when you need it.</p></div>{error && <ErrorMessageModern message={error} />}<div className="rounded-2xl border border-deep-teal/10 bg-white p-5 shadow-sm sm:p-8"><div className="mb-7 flex items-center gap-3 border-b border-deep-teal/10 pb-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/25 text-deep-teal"><BookOpen size={19} /></span><p className="text-sm text-muted-slate">All fields marked with * are required.</p></div><ResourceFormModern onSubmit={handleSubmit} submitLabel="Save resource" isLoading={saving} /></div></div>;
}
export default AddResourceModern;
