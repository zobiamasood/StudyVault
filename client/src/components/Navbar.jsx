import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Resources', path: '/resources' },
  { label: 'Add Resource', path: '/resources/add' },
];

function Navbar() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;
  const logoutUser = authContext?.logoutUser || (() => {});
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <NavLink to={user ? '/' : '/login'} className="logo-wrap">
          <span className="logo-mark">S</span>
          <span>StudyVault</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {user && navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          {!user ? (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/signup" className="nav-link">Sign up</NavLink>
            </>
          ) : (
            <>
              <div className="nav-user-info">
                <span className="user-name">{user.name}</span>
              </div>
              <button type="button" className="nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
