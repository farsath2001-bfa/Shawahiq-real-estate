import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BedDouble } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import './CommunityDetail.css';

const statusLabel = { 'off-plan': 'Off-Plan', ready: 'Ready', upcoming: 'Upcoming' };
const formatPrice = (num) => {
  if (num >= 1000000) return `AED ${(num / 1000000).toFixed(1)}M`;
  return `AED ${(num / 1000).toFixed(0)}K`;
};

const CommunityDetail = () => {
  const { slug } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const { data } = await api.get(`/communities/${slug}`);
        setCommunity(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) return <div className="cd-loading">Loading community…</div>;

  if (notFound || !community) {
    return (
      <div className="cd-notfound">
        <h2>Community not found</h2>
        <p>This community may have been removed or the link is incorrect.</p>
        <Link to="/communities" className="cd-back-link">← Back to all communities</Link>
      </div>
    );
  }

  const projects = community.projects || [];

  return (
    <div className="community-detail">
      <Seo
        title={community.name}
        description={community.description || `Explore properties in ${community.name}, Dubai.`}
        url={`https://shawahiqrealestate.ae/communities/${slug}`}
      />
      <section className="cd-hero">
        <div
          className="cd-hero-bg-image"
          style={{ backgroundImage: `url('${community.heroImage || '/hero-bg.svg'}')` }}
        />
        <div className="cd-hero-overlay" />
        <div className="cd-hero-content">
          <Link to="/communities" className="cd-back-link">← All Communities</Link>
          <h1>{community.name}</h1>
        </div>
      </section>

      <div className="cd-body">
        {community.description && <p className="cd-description">{community.description}</p>}

        <div className="cd-projects-header">
          <h2>Projects in {community.name}</h2>
          <span className="cd-projects-count">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {projects.length === 0 ? (
          <p className="cd-empty">No projects added to this community yet.</p>
        ) : (
          <div className="cd-projects-grid">
            {projects.map((project) => (
              <Link to={`/projects/${project.slug}`} key={project.slug} className="cd-project-card-link">
                <div className="cd-project-card">
                  <div
                    className="cd-project-card-image"
                    style={project.images?.[0] ? { backgroundImage: `url('${project.images[0]}')` } : undefined}
                  >
                    <span className="cd-project-status">{statusLabel[project.status] || project.status}</span>
                  </div>
                  <div className="cd-project-card-body">
                    <h3>{project.name}</h3>
                    <div className="cd-project-meta">
                      <span className="cd-project-price">
                        {formatPrice(project.priceRange?.min || 0)} – {formatPrice(project.priceRange?.max || 0)}
                      </span>
                      {project.bedrooms?.length > 0 && (
                        <span className="cd-project-beds">
                          <BedDouble size={14} strokeWidth={1.75} />
                          {project.bedrooms.join(' · ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;