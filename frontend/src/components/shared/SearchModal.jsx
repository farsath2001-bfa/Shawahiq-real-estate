import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Building2, MapPin } from 'lucide-react';
import api from '../../api/api';
import './SearchModal.css';

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [allProjects, setAllProjects] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const load = async () => {
      try {
        const [projectsRes, communitiesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/communities'),
        ]);
        setAllProjects(projectsRes.data);
        setAllCommunities(communitiesRes.data);
      } catch {
        // fail silently — search just shows no results
      } finally {
        setLoading(false);
      }
    };
    load();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const matchedProjects = q
    ? allProjects.filter((p) => p.name.toLowerCase().includes(q) || p.community?.name?.toLowerCase().includes(q))
    : [];
  const matchedCommunities = q
    ? allCommunities.filter((c) => c.name.toLowerCase().includes(q))
    : [];
  const hasResults = matchedProjects.length > 0 || matchedCommunities.length > 0;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-input-row">
          <Search size={20} strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects or communities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="search-modal-results">
          {loading && <p className="search-modal-status">Loading…</p>}

          {!loading && q && !hasResults && (
            <p className="search-modal-status">No results for "{query}"</p>
          )}

          {!loading && !q && (
            <p className="search-modal-status">Start typing to search projects and communities</p>
          )}

          {matchedProjects.length > 0 && (
            <div className="search-modal-group">
              <span className="search-modal-group-label">Projects</span>
              {matchedProjects.map((p) => (
                <Link to={`/projects/${p.slug}`} key={p._id} className="search-modal-item" onClick={onClose}>
                  <Building2 size={16} strokeWidth={1.75} />
                  <div>
                    <span className="search-modal-item-title">{p.name}</span>
                    <span className="search-modal-item-sub">{p.community?.name || 'Dubai'}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {matchedCommunities.length > 0 && (
            <div className="search-modal-group">
              <span className="search-modal-group-label">Communities</span>
              {matchedCommunities.map((c) => (
                <Link to={`/communities/${c.slug}`} key={c._id} className="search-modal-item" onClick={onClose}>
                  <MapPin size={16} strokeWidth={1.75} />
                  <div>
                    <span className="search-modal-item-title">{c.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;