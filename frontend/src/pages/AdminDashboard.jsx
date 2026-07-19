import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import './AdminDashboard.css';

const EMPTY_PROJECT_FORM = {
  name: '',
  slug: '',
  community: '',
  type: 'residential',
  status: 'off-plan',
  priceMin: '',
  priceMax: '',
  bedrooms: '',
  description: '',
};

const EMPTY_COMMUNITY_FORM = { name: '', slug: '', description: '' };

const AdminDashboard = () => {
  const { admin, login, logout, loading } = useAuth();

  // ---------- LOGIN STATE ----------
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // ---------- SHARED DATA ----------
  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // ---------- PROJECT FORM STATE ----------
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT_FORM);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [savingProject, setSavingProject] = useState(false);
  const [projectError, setProjectError] = useState('');
  const [projectSuccess, setProjectSuccess] = useState('');

  // ---------- COMMUNITY FORM STATE ----------
  const [communityForm, setCommunityForm] = useState(EMPTY_COMMUNITY_FORM);
  const [editingCommunityId, setEditingCommunityId] = useState(null);
  const [communityImageFile, setCommunityImageFile] = useState(null);
  const [uploadedCommunityImage, setUploadedCommunityImage] = useState('');
  const [uploadingCommunityImage, setUploadingCommunityImage] = useState(false);
  const [communityImageError, setCommunityImageError] = useState('');
  const [savingCommunity, setSavingCommunity] = useState(false);
  const [communityError, setCommunityError] = useState('');
  const [communitySuccess, setCommunitySuccess] = useState('');

  const fetchAll = async () => {
    setFetching(true);
    setFetchError('');
    try {
      const [projectsRes, communitiesRes] = await Promise.all([
        api.get('/projects'),
        api.get('/communities'),
      ]);
      setProjects(projectsRes.data);
      setCommunities(communitiesRes.data);
    } catch (err) {
      setFetchError('Could not load data. Check that the backend server is running.');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (admin) fetchAll();
  }, [admin]);

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      await login(loginForm.email, loginForm.password);
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed. Check your email and password.');
    } finally {
      setLoggingIn(false);
    }
  };

  // ---------- IMAGE UPLOAD ----------
  const handleImageSelect = (e) => {
    setImageFiles(Array.from(e.target.files));
    setUploadedImageUrls([]);
    setUploadError('');
  };

  const handleUploadImages = async () => {
    if (imageFiles.length === 0) return;
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append('files', file));
      const { data } = await api.post('/projects/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedImageUrls((prev) => [...prev, ...data.urls]);
      setImageFiles([]);
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    setUploadedImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  // ---------- PROJECT CRUD ----------
  const handleProjectFormChange = (e) => setProjectForm({ ...projectForm, [e.target.name]: e.target.value });

  const startEditProject = (p) => {
    setEditingProjectId(p._id);
    setProjectForm({
      name: p.name || '',
      slug: p.slug || '',
      community: p.community?._id || p.community || '',
      type: p.type || 'residential',
      status: p.status || 'off-plan',
      priceMin: p.priceRange?.min ?? '',
      priceMax: p.priceRange?.max ?? '',
      bedrooms: p.bedrooms?.join(', ') || '',
      description: p.description || '',
    });
    setUploadedImageUrls(p.images || []);
    setImageFiles([]);
    setProjectError('');
    setProjectSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setProjectForm(EMPTY_PROJECT_FORM);
    setImageFiles([]);
    setUploadedImageUrls([]);
    setProjectError('');
    setProjectSuccess('');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setProjectError('');
    setProjectSuccess('');
    setSavingProject(true);
    try {
      const payload = {
        name: projectForm.name,
        slug: projectForm.slug || projectForm.name.toLowerCase().trim().replace(/\s+/g, '-'),
        community: projectForm.community || undefined,
        type: projectForm.type,
        status: projectForm.status,
        priceRange: { min: Number(projectForm.priceMin) || 0, max: Number(projectForm.priceMax) || 0 },
        bedrooms: projectForm.bedrooms ? projectForm.bedrooms.split(',').map((b) => b.trim()) : [],
        description: projectForm.description,
        images: uploadedImageUrls,
      };

      if (editingProjectId) {
        await api.put(`/projects/${editingProjectId}`, payload);
        setProjectSuccess('Project updated successfully.');
      } else {
        await api.post('/projects', payload);
        setProjectSuccess('Project added successfully.');
      }

      setEditingProjectId(null);
      setProjectForm(EMPTY_PROJECT_FORM);
      setImageFiles([]);
      setUploadedImageUrls([]);
      fetchAll();
    } catch (err) {
      setProjectError(err.response?.data?.message || 'Could not save project.');
    } finally {
      setSavingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchAll();
    } catch (err) {
      alert('Could not delete project.');
    }
  };

  // ---------- COMMUNITY CRUD ----------
  const handleCommunityFormChange = (e) => setCommunityForm({ ...communityForm, [e.target.name]: e.target.value });

  const handleCommunityImageSelect = (e) => {
    setCommunityImageFile(e.target.files[0] || null);
    setUploadedCommunityImage('');
    setCommunityImageError('');
  };

  const handleUploadCommunityImage = async () => {
    if (!communityImageFile) return;
    setUploadingCommunityImage(true);
    setCommunityImageError('');
    try {
      const formData = new FormData();
      formData.append('files', communityImageFile);
      const { data } = await api.post('/projects/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedCommunityImage(data.urls[0]);
    } catch (err) {
      setCommunityImageError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploadingCommunityImage(false);
    }
  };

  const startEditCommunity = (c) => {
    setEditingCommunityId(c._id);
    setCommunityForm({
      name: c.name || '',
      slug: c.slug || '',
      description: c.description || '',
    });
    setUploadedCommunityImage(c.heroImage || '');
    setCommunityImageFile(null);
    setCommunityError('');
    setCommunitySuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditCommunity = () => {
    setEditingCommunityId(null);
    setCommunityForm(EMPTY_COMMUNITY_FORM);
    setCommunityImageFile(null);
    setUploadedCommunityImage('');
    setCommunityError('');
    setCommunitySuccess('');
  };

  const handleAddCommunity = async (e) => {
    e.preventDefault();
    setCommunityError('');
    setCommunitySuccess('');
    setSavingCommunity(true);
    try {
      const payload = {
        name: communityForm.name,
        slug: communityForm.slug || communityForm.name.toLowerCase().trim().replace(/\s+/g, '-'),
        description: communityForm.description,
        heroImage: uploadedCommunityImage || undefined,
      };

      if (editingCommunityId) {
        await api.put(`/communities/${editingCommunityId}`, payload);
        setCommunitySuccess('Community updated successfully.');
      } else {
        await api.post('/communities', payload);
        setCommunitySuccess('Community added successfully.');
      }

      setEditingCommunityId(null);
      setCommunityForm(EMPTY_COMMUNITY_FORM);
      setCommunityImageFile(null);
      setUploadedCommunityImage('');
      fetchAll();
    } catch (err) {
      setCommunityError(err.response?.data?.message || 'Could not save community.');
    } finally {
      setSavingCommunity(false);
    }
  };

  const handleDeleteCommunity = async (id) => {
    if (!window.confirm('Delete this community? Projects linked to it will remain but show no community.')) return;
    try {
      await api.delete(`/communities/${id}`);
      fetchAll();
    } catch (err) {
      alert('Could not delete community.');
    }
  };

  if (loading) return null;

  // ---------- LOGIN GATE ----------
  if (!admin) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <img src="/logo.png" alt="Shawahiq Real Estate" className="admin-login-logo" />
          <h1>Admin Login</h1>
          <p>Sign in to manage projects and communities.</p>
          {loginError && <div className="admin-error">{loginError}</div>}
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={loginForm.email} onChange={handleLoginChange} required />
            </div>
            <div className="admin-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={loginForm.password} onChange={handleLoginChange} required />
            </div>
            <button type="submit" className="admin-btn-primary" disabled={loggingIn}>
              {loggingIn ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD ----------
  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Signed in as {admin.email}</p>
        </div>
        <button className="admin-btn-outline" onClick={logout}>Log Out</button>
      </div>

      {fetchError && <div className="admin-error admin-topbar-error">{fetchError}</div>}

      <div className="admin-grid">
        {/* ADD PROJECT FORM */}
        <div className="admin-card">
          <h2>{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
          {projectError && <div className="admin-error">{projectError}</div>}
          {projectSuccess && <div className="admin-success">{projectSuccess}</div>}
          <form onSubmit={handleAddProject} className="admin-form">
            <div className="admin-field">
              <label htmlFor="name">Project Name</label>
              <input id="name" type="text" name="name" value={projectForm.name} onChange={handleProjectFormChange} required />
            </div>
            <div className="admin-field">
              <label htmlFor="slug">Slug (URL) — optional, auto-generated from name</label>
              <input id="slug" type="text" name="slug" value={projectForm.slug} onChange={handleProjectFormChange} placeholder="e.g. horizon-residences" />
            </div>
            <div className="admin-field">
              <label htmlFor="community">Community</label>
              <select id="community" name="community" value={projectForm.community} onChange={handleProjectFormChange}>
                <option value="">— No community —</option>
                {communities.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label htmlFor="type">Type</label>
                <select id="type" name="type" value={projectForm.type} onChange={handleProjectFormChange}>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="admin-field">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={projectForm.status} onChange={handleProjectFormChange}>
                  <option value="off-plan">Off-Plan</option>
                  <option value="ready">Ready</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label htmlFor="priceMin">Min Price (AED)</label>
                <input id="priceMin" type="number" name="priceMin" value={projectForm.priceMin} onChange={handleProjectFormChange} required />
              </div>
              <div className="admin-field">
                <label htmlFor="priceMax">Max Price (AED)</label>
                <input id="priceMax" type="number" name="priceMax" value={projectForm.priceMax} onChange={handleProjectFormChange} required />
              </div>
            </div>
            <div className="admin-field">
              <label htmlFor="bedrooms">Bedrooms (comma-separated)</label>
              <input id="bedrooms" type="text" name="bedrooms" value={projectForm.bedrooms} onChange={handleProjectFormChange} placeholder="e.g. 1BR, 2BR, 3BR" />
            </div>
            <div className="admin-field">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="4" value={projectForm.description} onChange={handleProjectFormChange} />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="admin-field">
              <label htmlFor="images">Project Images</label>
              <input id="images" type="file" accept="image/*" multiple onChange={handleImageSelect} />
              {imageFiles.length > 0 && (
                <button
                  type="button"
                  className="admin-btn-outline admin-upload-btn"
                  onClick={handleUploadImages}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading…' : `Upload ${imageFiles.length} image(s)`}
                </button>
              )}
              {uploadError && <div className="admin-error">{uploadError}</div>}
              {uploadedImageUrls.length > 0 && (
                <div className="admin-image-preview-grid">
                  {uploadedImageUrls.map((url) => (
                    <div className="admin-image-preview-wrap" key={url}>
                      <img src={url} alt="Uploaded preview" className="admin-image-preview" />
                      <button
                        type="button"
                        className="admin-image-remove-btn"
                        onClick={() => handleRemoveImage(url)}
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-primary" disabled={savingProject}>
                {savingProject ? 'Saving…' : editingProjectId ? 'Update Project' : 'Add Project'}
              </button>
              {editingProjectId && (
                <button type="button" className="admin-btn-outline" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PROJECT LIST */}
        <div className="admin-card">
          <h2>All Projects ({projects.length})</h2>
          {fetching && <p className="admin-muted">Loading projects…</p>}
          {!fetching && projects.length === 0 && (
            <p className="admin-muted">No projects yet — add one using the form.</p>
          )}
          <div className="admin-project-list">
            {projects.map((p) => (
              <div className="admin-project-row" key={p._id}>
                <div>
                  <strong>{p.name}</strong>
                  <span className="admin-project-meta">
                    {p.status} · AED {p.priceRange?.min?.toLocaleString()} – {p.priceRange?.max?.toLocaleString()}
                    {p.community?.name ? ` · ${p.community.name}` : ''}
                  </span>
                </div>
                <div className="admin-row-actions">
                  <button className="admin-btn-outline admin-btn-small" onClick={() => startEditProject(p)}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => handleDeleteProject(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD COMMUNITY FORM */}
        <div className="admin-card">
          <h2>{editingCommunityId ? 'Edit Community' : 'Add New Community'}</h2>
          {communityError && <div className="admin-error">{communityError}</div>}
          {communitySuccess && <div className="admin-success">{communitySuccess}</div>}
          <form onSubmit={handleAddCommunity} className="admin-form">
            <div className="admin-field">
              <label htmlFor="cname">Community Name</label>
              <input id="cname" type="text" name="name" value={communityForm.name} onChange={handleCommunityFormChange} required />
            </div>
            <div className="admin-field">
              <label htmlFor="cslug">Slug (URL) — optional, auto-generated from name</label>
              <input id="cslug" type="text" name="slug" value={communityForm.slug} onChange={handleCommunityFormChange} placeholder="e.g. marina-quarter" />
            </div>
            <div className="admin-field">
              <label htmlFor="cdescription">Description</label>
              <textarea id="cdescription" name="description" rows="3" value={communityForm.description} onChange={handleCommunityFormChange} />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="admin-field">
              <label htmlFor="cimage">Community Image</label>
              <input id="cimage" type="file" accept="image/*" onChange={handleCommunityImageSelect} />
              {communityImageFile && !uploadedCommunityImage && (
                <button
                  type="button"
                  className="admin-btn-outline admin-upload-btn"
                  onClick={handleUploadCommunityImage}
                  disabled={uploadingCommunityImage}
                >
                  {uploadingCommunityImage ? 'Uploading…' : 'Upload Image'}
                </button>
              )}
              {communityImageError && <div className="admin-error">{communityImageError}</div>}
              {uploadedCommunityImage && (
                <div className="admin-image-preview-grid">
                  <div className="admin-image-preview-wrap">
                    <img src={uploadedCommunityImage} alt="Uploaded preview" className="admin-image-preview" />
                    <button
                      type="button"
                      className="admin-image-remove-btn"
                      onClick={() => setUploadedCommunityImage('')}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-primary" disabled={savingCommunity}>
                {savingCommunity ? 'Saving…' : editingCommunityId ? 'Update Community' : 'Add Community'}
              </button>
              {editingCommunityId && (
                <button type="button" className="admin-btn-outline" onClick={cancelEditCommunity}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* COMMUNITY LIST */}
        <div className="admin-card">
          <h2>All Communities ({communities.length})</h2>
          {fetching && <p className="admin-muted">Loading communities…</p>}
          {!fetching && communities.length === 0 && (
            <p className="admin-muted">No communities yet — add one using the form.</p>
          )}
          <div className="admin-project-list">
            {communities.map((c) => (
              <div className="admin-project-row" key={c._id}>
                <div>
                  <strong>{c.name}</strong>
                  <span className="admin-project-meta">
                    /{c.slug}{c.heroImage ? ' · has image' : ' · no image yet'}
                  </span>
                </div>
                <div className="admin-row-actions">
                  <button className="admin-btn-outline admin-btn-small" onClick={() => startEditCommunity(c)}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => handleDeleteCommunity(c._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;