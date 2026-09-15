function LoadingModern({ message = 'Loading...' }) {
  return <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-deep-teal/10 bg-white p-8 text-center shadow-sm"><div className="h-10 w-10 animate-spin rounded-full border-4 border-sage/30 border-t-deep-teal" aria-label="Loading" /><p className="text-sm font-medium text-muted-slate">{message}</p></div>;
}
export default LoadingModern;
