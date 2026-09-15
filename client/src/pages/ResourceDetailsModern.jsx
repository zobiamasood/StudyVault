import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, ExternalLink, Pencil, Trash2, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingModern from '../components/LoadingModern';
import ErrorMessageModern from '../components/ErrorMessageModern';
import { deleteResource, getResourceById } from '../services/api';
import { categoryStyles, formatDate, getValidResourceUrl, normalizeCategory } from '../utils/resource';

function ResourceDetailsModern() {
  const { id } = useParams(); const { user } = useAuth(); const [resource, setResource] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [linkError, setLinkError] = useState(''); const [deleting, setDeleting] = useState(false);
  useEffect(() => { getResourceById(id).then(setResource).catch(() => setError('Unable to find this resource.')).finally(() => setLoading(false)); }, [id]);
  if (loading) return <LoadingModern message="Loading resource details..." />;
  if (error || !resource) return <ErrorMessageModern message={error || 'Resource not found.'} />;
  const category = normalizeCategory(resource.category);
  const resourceUrl = getValidResourceUrl(resource.resourceLink);
  const isOwner = resource.createdBy?._id === user?._id || resource.createdBy === user?._id;
  const handleOpenResource = () => {
    if (!resourceUrl) {
      setLinkError('This resource does not have a valid web link.');
      return;
    }
    window.open(resourceUrl, '_blank', 'noopener,noreferrer');
  };
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      setDeleting(true);
      await deleteResource(resource._id);
      window.location.assign('/resources');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete this resource. Please try again.');
      setDeleting(false);
    }
  };
  return <div className="mx-auto max-w-4xl space-y-6"><Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-slate hover:text-deep-teal"><ArrowLeft size={16} /> Back to resources</Link><article className="overflow-hidden rounded-3xl border border-deep-teal/10 bg-white shadow-sm"><div className="bg-deep-teal px-6 py-10 text-white sm:px-10"><span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[category]}`}>{category}</span><h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{resource.title}</h1><p className="mt-3 text-white/70">{resource.subject}</p></div><div className="space-y-8 p-6 sm:p-10"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-slate">About this resource</p><p className="mt-3 max-w-2xl text-base leading-8 text-charcoal">{resource.description || 'No description added.'}</p></div><div className="grid gap-4 border-y border-deep-teal/10 py-6 sm:grid-cols-3"><div className="flex items-center gap-3"><CalendarDays size={18} className="text-muted-gold" /><div><p className="text-xs text-muted-slate">Added</p><p className="text-sm font-semibold text-deep-teal">{formatDate(resource.createdAt, { year: 'numeric', month: 'long', day: 'numeric' })}</p></div></div><div className="flex items-center gap-3"><UserRound size={18} className="text-muted-gold" /><div><p className="text-xs text-muted-slate">Created by</p><p className="text-sm font-semibold text-deep-teal">{resource.createdBy?.name || 'You'}</p></div></div><div><p className="text-xs text-muted-slate">Subject</p><p className="mt-1 text-sm font-semibold text-deep-teal">{resource.subject}</p></div></div><div className="flex flex-wrap gap-3"><button type="button" onClick={handleOpenResource} className="inline-flex items-center gap-2 rounded-lg bg-muted-gold px-4 py-2.5 text-sm font-semibold text-deep-teal hover:bg-gold-hover hover:text-white">Open resource <ExternalLink size={16} /></button>{isOwner && <><Link to={`/resources/${resource._id}/edit`} className="inline-flex items-center gap-2 rounded-lg border border-deep-teal/20 px-4 py-2.5 text-sm font-semibold text-deep-teal hover:bg-warm-cream"><Pencil size={16} /> Edit resource</Link><button type="button" onClick={handleDelete} disabled={deleting} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"><Trash2 size={16} /> {deleting ? 'Deleting...' : 'Delete resource'}</button></>}</div>{linkError && <p className="text-sm font-medium text-red-600" role="alert">Resource link is unavailable.</p>}</div></article></div>;
}
export default ResourceDetailsModern;
