export const RESOURCE_CATEGORIES = ['Notes', 'Past Papers', 'Assignments', 'Books', 'Videos', 'Other'];

export const normalizeCategory = (category) => {
  const value = String(category || '').trim().toLowerCase();
  const categoryMap = {
    note: 'Notes',
    notes: 'Notes',
    'past paper': 'Past Papers',
    'past papers': 'Past Papers',
    assignment: 'Assignments',
    assignments: 'Assignments',
    book: 'Books',
    books: 'Books',
    video: 'Videos',
    videos: 'Videos',
    other: 'Other',
  };

  return categoryMap[value] || 'Other';
};

export const formatDate = (dateString, options = { year: 'numeric', month: 'short', day: 'numeric' }) => {
  if (!dateString) return 'No date';
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getValidResourceUrl = (value) => {
  try {
    const url = new URL(String(value || '').trim());
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
};

export const categoryStyles = {
  Notes: 'bg-[#A8B5A2]/35 text-[#0F3D3E] border-[#A8B5A2]/50',
  'Past Papers': 'bg-[#C6A15B]/20 text-[#765b27] border-[#C6A15B]/45',
  Assignments: 'bg-[#0F3D3E]/10 text-[#0F3D3E] border-[#0F3D3E]/15',
  Books: 'bg-stone-100 text-stone-700 border-stone-200',
  Videos: 'bg-[#0F3D3E]/10 text-[#0F3D3E] border-[#0F3D3E]/15',
  Other: 'bg-stone-100 text-stone-600 border-stone-200',
};
