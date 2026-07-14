import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BedDouble } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import './Projects.css';

const STATUSES = ['All', 'off-plan', 'ready', 'upcoming'];
const BEDROOM_OPTIONS = ['All', 'Studio', '1BR', '2BR', '3BR', '4BR', '5BR'];

const formatPrice = (num) => {
  if (num >= 1000000) return `AED ${(num / 1000000).toFixed(1)}M`;
  return `AED ${(num / 1000).toFixed(0)}K`;
};

const statusLabel = { 'off-plan': 'Off-Plan', ready: 'Ready', upcoming: 'Upcoming' };

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [community, setCommunity] = useState('All');
  const [status, setStatus] = useState('All');
  const [bedrooms, setBedrooms] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        const [projectsRes, communitiesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/communities'),
        ]);
        setAllProjects(projectsRes.data);
        setCommunities(communitiesRes.data);
      } catch (err) {
        setError('Could not load projects. Check that the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const communityOptions = useMemo(
    () => ['All', ...communities.map((c) => c.name)],
    [communities]
  );

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (community !== 'All' && p.community?.name !== community) return false;
      if (status !== 'All' && p.status !== status) return false;
      if (bedrooms !== 'All' && !p.bedrooms?.includes(bedrooms)) return false;
      return true;
    });
  }, [allProjects, community, status, bedrooms]);

  const resetFilters = () => {
    setCommunity('All');
    setStatus('All');
    setBedrooms('All');
  };

  const hasActiveFilters = community !== 'All' || status !== 'All' || bedrooms !== 'All';

  return (
    <div className="projects-page">
      <Seo
        title="All Projects"
        description="Browse every off-plan and ready property listing across Dubai, filterable by community, status, and unit type."
      />
      <section className="projects-hero">
        <div className="projects-hero-bg-image" style={{ backgroundImage: `url('/hero-bg.svg')` }} />
        <div className="projects-hero-overlay" />
        <div className="projects-hero-content">
          <span className="projects-eyebrow">Listings</span>
          <h1>All Projects</h1>
          <p>Browse every development currently available, filtered by community, status, or unit type.</p>
        </div>
      </section>

      <section className="projects-filters">
        <div className="filter-group">
          <label htmlFor="community-filter">Community</label>
          <select id="community-filter" value={community} onChange={(e) => setCommunity(e.target.value)}>
            {communityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select id="status-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All' : statusLabel[s]}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="bedrooms-filter">Bedrooms</label>
          <select id="bedrooms-filter" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            {BEDROOM_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {hasActiveFilters && (
          <button className="filter-reset" onClick={resetFilters}>Clear filters</button>
        )}
      </section>

      <section className="projects-results">
        {loading && <div className="results-count">Loading projects…</div>}
        {error && <div className="empty-state"><p>{error}</p></div>}

        {!loading && !error && (
          <>
            <div className="results-count">
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} found
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>No projects match these filters</h3>
                <p>Try clearing a filter or choosing a different community.</p>
                <button className="filter-reset" onClick={resetFilters}>Clear filters</button>
              </div>
            ) : (
              <div className="projects-grid">
                {filtered.map((project) => (
                  <Link to={`/projects/${project.slug}`} key={project.slug} className="project-card-link">
                    <div className="project-card">
                      <div
                        className="project-card-image"
                        style={project.images?.[0] ? { backgroundImage: `url('${project.images[0]}')` } : undefined}
                      >
                        <span className="project-status">{statusLabel[project.status] || project.status}</span>
                      </div>
                      <div className="project-card-body">
                        <span className="project-community">{project.community?.name || 'Dubai'}</span>
                        <h3>{project.name}</h3>
                        <div className="project-meta">
                          <span className="project-price">
                            {formatPrice(project.priceRange?.min || 0)} – {formatPrice(project.priceRange?.max || 0)}
                          </span>
                          {project.bedrooms?.length > 0 && (
                            <span className="project-beds">
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
          </>
        )}
      </section>
    </div>
  );
};

export default Projects;