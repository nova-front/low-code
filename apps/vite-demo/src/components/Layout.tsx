import React from 'react';
import { Link, useLocation } from 'react-router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/base-ui', label: 'Base UI', icon: '🎨' },
    { path: '/editor', label: '编辑器', icon: '📝' },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              🚀 Nova Frontend Demo
            </Link>
            <ul className="navbar-nav">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
