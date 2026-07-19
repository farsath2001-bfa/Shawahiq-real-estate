import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import Counter from '../components/shared/Counter';
import './Communities.css';

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [communitiesRes, projectsRes] = await Promise.all([
          api.get('/communities'),
          api.get('/projects'),
        ]);
        setCommunities(communitiesRes.data);

        const counts = {};
        projectsRes.data.forEach((p) => {
          const communityId = p.community?._id || p.community;
          if (communityId) counts[communityId] = (counts[communityId] || 0) + 1;
        });
        setProjectCounts(counts);
      } catch (err) {
        setError('Could not load communities. Check that the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="communities-page">
      <Seo
        title="Communities"
        description="Explore Dubai's top real estate communities, each grouped with its available projects and developments."
      />
      <section className="communities-hero">
        <div className="communities-hero-text">
          <span className="communities-eyebrow">Neighborhoods</span>
          <h1>Communities</h1>
          <p>Every development grouped by the neighborhood it belongs to — explore each community's character before you look at individual units.</p>
          <div className="communities-hero-stats">
            <div className="communities-hero-stat">
              <span className="num">
                {communities.length > 0 ? <Counter end={communities.length} /> : '—'}
              </span>
              <span className="label">Communities</span>
            </div>
            <div className="communities-hero-stat">
              <span className="num">Dubai</span>
              <span className="label">United Arab Emirates</span>
            </div>
          </div>
        </div>
        <div className="communities-hero-image-wrap">
          <img src="/communities.jpg" alt="Map of Dubai's key communities" className="communities-hero-image" />
        </div>
      </section>

      <section className="communities-list">
        {loading && <p className="communities-status">Loading communities…</p>}
        {error && <p className="communities-status">{error}</p>}
        {!loading && !error && communities.length === 0 && (
          <p className="communities-status">No communities added yet — check back soon.</p>
        )}

        {communities.map((c, i) => (
          <Link to={`/communities/${c.slug}`} key={c.slug} className="community-row-link">
            <div className="community-row">
              <div
                className={`community-row-visual ${!c.heroImage ? `community-row-visual-${i % 4}` : ''}`}
                style={c.heroImage ? { backgroundImage: `url('${c.heroImage}')` } : undefined}
              />
              <div className="community-row-content">
                <h2>{c.name}</h2>
                {c.description && <p>{c.description}</p>}
                <div className="community-row-meta">
                  <span className="community-row-location">
                    <MapPin size={14} strokeWidth={1.75} />
                    Dubai, UAE
                  </span>
                  <span className="community-row-count">
                    {projectCounts[c._id] || 0} {projectCounts[c._id] === 1 ? 'project' : 'projects'}
                  </span>
                </div>
              </div>
              <span className="community-row-arrow">→</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Communities;