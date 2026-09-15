import { BookOpen, CalendarDays, ExternalLink, FileText, Pencil, PlayCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categoryStyles, formatDate, getValidResourceUrl, normalizeCategory } from '../utils/resource';

const iconByCategory = { Notes: FileText, 'Past Papers': FileText, Assignments: FileText, Books: BookOpen, Videos: PlayCircle, Other: FileText };

function ResourceCardModern({ resource, onDelete }) {
  const { user } = useAuth();
  const category = normalizeCategory(resource.category);
  const Icon = iconByCategory[category] || FileText;
  const resourceUrl = getValidResourceUrl(resource.resourceLink);
  const [linkError, setLinkError] = useState('');
  const isOwner = resource.createdBy?._id === user?._id || resource.createdBy === user?._id;
  const handleOpenResource = () => {
    if (!resourceUrl) {
      setLinkError('This resource does not have a valid web link.');
      return;
    }
    window.open(resourceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-deep-teal/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-muted-gold/50 hover:shadow-xl hover:shadow-deep-teal/10">
      <div className="flex items-start justify-between gap-3"><span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryStyles[category]}`}>{category}</span><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm-cream text-deep-teal transition group-hover:bg-muted-gold/20"><Icon size={18} /></span></div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-slate">{resource.subject}</p>
      <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-deep-teal">{resource.title}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-slate">{resource.description || 'No description added yet.'}</p>
      <div className="mt-5 flex items-center gap-2 border-t border-deep-teal/10 pt-4 text-xs text-muted-slate"><CalendarDays size={14} /><time dateTime={resource.createdAt}>{formatDate(resource.createdAt)}</time></div>
      <div className="mt-4 flex flex-wrap gap-2"><Link to={`/resources/${resource._id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-deep-teal px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-deep-teal/90">View <ExternalLink size={13} /></Link><button type="button" onClick={handleOpenResource} className="inline-flex items-center gap-1.5 rounded-lg bg-muted-gold px-3 py-2 text-xs font-semibold text-deep-teal transition hover:-translate-y-0.5 hover:bg-gold-hover hover:text-white">Open Resource <ExternalLink size={13} /></button>{isOwner && <><Link to={`/resources/${resource._id}/edit`} className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-muted-slate transition hover:bg-warm-cream hover:text-deep-teal"><Pencil size={13} />Edit</Link><button type="button" onClick={() => onDelete(resource._id)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"><Trash2 size={13} />Delete</button></>}</div>{linkError && <p className="mt-3 text-xs font-medium text-red-600" role="alert">Resource link is unavailable.</p>}
    </article>
  );
}
export default ResourceCardModern;
