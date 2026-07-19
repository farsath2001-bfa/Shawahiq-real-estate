import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

const statusLabel = { 'off-plan': 'Off-Plan', ready: 'Ready', upcoming: 'Upcoming' };
const formatPrice = (num) => {
  if (num >= 1000000) return `AED ${(num / 1000000).toFixed(1)}M`;
  return `AED ${(num / 1000).toFixed(0)}K`;
};

const Wishlist = () => {
  const { wishlist, toggle } = useWishlist();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data.filter((p) => wishlist.includes(p._id)));
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [wishlist]);

  return (
    <div className="wishlist-page">
      <Seo title="My Wishlist" description="Your saved properties on Shawahiq Real Estate." noindex />

      <section className="wishlist-hero">
        <span className="wishlist-eyebrow">Saved</span>
        <h1>My Wishlist</h1>
        <p>Properties you've saved for later — stored on this device.</p>
      </section>

      <section className="wishlist-body">
        {loading && <p className="wishlist-status">Loading…</p>}

        {!loading && projects.length === 0 && (
          <div className="wishlist-empty">
            <Heart size={40} strokeWidth={1.5} />
            <h3>No saved properties yet</h3>
            <p>Tap the heart icon on any project to save it here.</p>
            <Link to="/projects" className="wishlist-browse-link">Browse Projects →</Link>
          </div>
        )}

        <div className="wishlist-grid">
          {projects.map((project) => (
            <div className="wishlist-card" key={project._id}>
              <Link to={`/projects/${project.slug}`} className="wishlist-card-link">
                <div
                  className="wishlist-card-image"
                  style={project.images?.[0] ? { backgroundImage: `url('${project.images[0]}')` } : undefined}
                >
                  <span className="wishlist-card-status">{statusLabel[project.status] || project.status}</span>
                </div>
                <div className="wishlist-card-body">
                  <span className="wishlist-card-community">{project.community?.name || 'Dubai'}</span>
                  <h3>{project.name}</h3>
                  <span className="wishlist-card-price">
                    {formatPrice(project.priceRange?.min || 0)} – {formatPrice(project.priceRange?.max || 0)}
                  </span>
                </div>
              </Link>
              <button
                className="wishlist-remove-btn"
                onClick={() => toggle(project._id)}
                aria-label="Remove from wishlist"
              >
                <Heart size={16} strokeWidth={2} fill="currentColor" />
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;