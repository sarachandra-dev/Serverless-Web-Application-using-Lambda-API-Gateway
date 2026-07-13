import { Link, useLocation } from 'react-router-dom';
import { FaBolt, FaShareAlt, FaDownload } from 'react-icons/fa';

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: '/share',    label: 'Share',    icon: <FaShareAlt /> },
    { to: '/retrieve', label: 'Retrieve', icon: <FaDownload /> },
  ];

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-indigo-400 text-xl group-hover:text-indigo-300 transition-colors">
          <FaBolt />
        </span>
        <span className="text-xl font-extrabold text-white tracking-tight">
          Quick<span className="text-indigo-400">Share</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {links.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${pathname === to
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-indigo-300 hover:bg-white/10 hover:text-white'
              }`}
          >
            <span className="text-xs">{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
