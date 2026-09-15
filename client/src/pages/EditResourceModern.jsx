import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import ResourceFormModern from '../components/ResourceFormModern';
import LoadingModern from '../components/LoadingModern';
import ErrorMessageModern from '../components/ErrorMessageModern';
import { getResourceById, updateResource } from '../services/api';

function EditResourceModern() {
  const { id } = useParams(); const navigate = useNavigate(); const [resource, setResource] = useState(null); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  useEffect(() => { getResourceById(id).then(setResource).catch(() => setError('Unable to find this resource.')).finally(() => setLoading(false)); }, [id]);
  const handleSubmit = async (data) => { try { setSaving(true); const response = await updateResource(id, data); if (!response?.resource) throw new Error('The server did not return the updated resource.'); navigate('/resources', { state: { message: 'Resource updated successfully.' } }); } catch (requestError) { setError(requestError.response?.data?.message || requestError.message || 'Unable to update resource. Please try again.'); } finally { setSaving(false); } };
  if (loading) return <LoadingModern message="Loading resource details..." />;
  if (!resource) return <ErrorMessageModern message={error || 'Resource not found.'} />;
  return <div className="mx-auto max-w-4xl space-y-7"><Link to={`/resources/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-slate hover:text-deep-teal"><ArrowLeft size={16} /> Back to resource</Link><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-slate">Refine your library</p><h1 className="mt-2 font-display text-4xl font-semibold text-deep-teal">Edit resource</h1><p className="mt-2 text-sm text-muted-slate">Keep the details useful and up to date.</p></div>{error && <ErrorMessageModern message={error} />}<div className="rounded-2xl border border-deep-teal/10 bg-white p-5 shadow-sm sm:p-8"><div className="mb-7 flex items-center gap-3 border-b border-deep-teal/10 pb-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted-gold/20 text-deep-teal"><Pencil size={18} /></span><p className="truncate text-sm font-medium text-muted-slate">Editing {resource.title}</p></div><ResourceFormModern key={resource._id} initialData={resource} onSubmit={handleSubmit} submitLabel="Update resource" isLoading={saving} /></div></div>;
}
export default EditResourceModern;
