import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Menu, Plus, Search, UserRound, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Resources', path: '/resources' },
  { label: 'Add Resource', path: '/resources/add' },
];

function NavbarModern() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => { logoutUser(); setMenuOpen(false); navigate('/login'); };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-deep-teal text-white shadow-lg shadow-deep-teal/10">
      <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-8 lg:px-8">
        <NavLink to={user ? '/' : '/login'} className="group flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted-gold text-deep-teal shadow-md transition-transform group-hover:-rotate-3"><BookOpen size={20} strokeWidth={2.2} /></span>
          <span className="font-display text-xl font-semibold tracking-tight">StudyVault</span>
        </NavLink>
        <button type="button" className="rounded-lg p-2 text-white/80 hover:bg-white/10 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-4 right-4 top-20 flex-col gap-2 rounded-2xl border border-deep-teal/10 bg-white p-3 text-deep-teal shadow-xl md:static md:flex md:flex-1 md:flex-row md:items-center md:justify-end md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Main navigation">
          {user && navItems.map((item) => <NavLink key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3 md:text-white/75 ${isActive ? 'bg-muted-gold/15 text-deep-teal md:bg-white/10 md:text-white' : 'hover:bg-deep-teal/5 hover:text-deep-teal md:hover:bg-white/10 md:hover:text-white'}`}>{item.label === 'Add Resource' && <Plus size={16} />}{item.label === 'Resources' && <Search size={16} />}{item.label}</NavLink>)}
          {!user ? <><NavLink to="/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-deep-teal hover:bg-deep-teal/5 md:text-white/80 md:hover:bg-white/10 md:hover:text-white">Login</NavLink><NavLink to="/signup" onClick={() => setMenuOpen(false)} className="rounded-lg bg-muted-gold px-4 py-2 text-sm font-semibold text-deep-teal shadow-sm transition hover:bg-gold-hover hover:text-white">Sign up</NavLink></> : <><div className="my-1 flex items-center gap-2 border-t border-deep-teal/10 px-3 pt-3 text-sm text-muted-slate md:my-0 md:border-0 md:px-2 md:pt-0 md:text-white/75"><UserRound size={16} /><span className="max-w-32 truncate">{user.name}</span></div><button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-deep-teal hover:bg-deep-teal/5 md:text-white/75 md:hover:bg-white/10 md:hover:text-white" onClick={handleLogout}><LogOut size={16} />Logout</button></>}
        </nav>
      </div>
    </header>
  );
}

export default NavbarModern;
