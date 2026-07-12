import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, Users, FolderKanban, MessageSquare, Mail, Search, X, Check, Eye, LogOut } from 'lucide-react';

export default function AdminDashboard({ projects, setProjects, volunteers, setVolunteers, inquiries, setInquiries, newsletters, setNewsletters, setCurrentView, onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');

  const PREDEFINED_CATEGORIES = [
    'Free Medical Camps',
    'Project Haya',
    'Nature Rehabilitation',
    'Special Nation',
    'Learn2Earn',
    'One Nation Explorers'
  ];

  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const handleProjectImageError = (event) => {
    event.target.src = '/placeholder-project.jpg';
  };

  // A normal Google Drive "share" link (e.g. .../file/d/FILE_ID/view?usp=sharing
  // or .../open?id=FILE_ID) points to an HTML viewer page, not raw image bytes,
  // so an <img> tag can never render it directly. This extracts the file ID
  // from any of the common Drive link formats.
  const extractGoogleDriveFileId = (url) => {
    if (!url) return null;
    const patterns = [
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/uc\?(?:export=[a-z]+&)?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/,
      /lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Converts any Google Drive link into a direct, hotlink-friendly image URL.
  // Non-Drive URLs are returned untouched.
  const normalizeImageUrl = (url) => {
    if (!url) return url;
    const fileId = extractGoogleDriveFileId(url);
    if (!fileId) return url;
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  };

  const getProjectImageSrc = (imageUrl) => {
    if (!imageUrl) return '/placeholder-project.jpg';
    if (imageUrl.startsWith('/')) return imageUrl;
    const normalized = normalizeImageUrl(imageUrl);
    return `/api/image-proxy?url=${encodeURIComponent(normalized)}`;
  };

  // Forms states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    details: '',
    location: '',
    date: '',
    status: 'Ongoing',
    category: 'Free Medical Camps',
    image: ''
  });

  // Project modal form changes
  const handleProjectFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setProjectForm(prev => ({ ...prev, image: normalizeImageUrl(value) }));
      return;
    }
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  // Only the dropdown (not the manual text input) should be able to
  // switch in/out of custom-category mode.
  const handleCategorySelectChange = (e) => {
    const { value } = e.target;
    if (value === '__custom__') {
      setIsCustomCategory(true);
      setProjectForm(prev => ({ ...prev, category: '' }));
    } else {
      setIsCustomCategory(false);
      setProjectForm(prev => ({ ...prev, category: value }));
    }
  };

  // Open modal for adding a project
  const handleAddProjectClick = () => {
    setEditingProject(null);
    setIsCustomCategory(false);
    setProjectForm({
      title: '',
      description: '',
      details: '',
      location: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      status: 'Ongoing',
      category: 'Free Medical Camps',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
    });
    setIsProjectModalOpen(true);
  };

  // Open modal for editing a project
  const handleEditProjectClick = (project) => {
    setEditingProject(project.id);
    setIsCustomCategory(Boolean(project.category) && !PREDEFINED_CATEGORIES.includes(project.category));
    setProjectForm({
      title: project.title,
      description: project.description,
      details: project.details || project.description,
      location: project.location,
      date: project.date,
      status: project.status,
      category: project.category || 'Free Medical Camps',
      image: project.image
    });
    setIsProjectModalOpen(true);
  };

  // Submit project (Add or Edit)
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description || !projectForm.location) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editingProject) {
        const response = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject, ...projectForm })
        });

        if (!response.ok) throw new Error('Failed to update project');
        const updatedProject = await response.json();
        setProjects((prev) => prev.map((p) => p.id === editingProject ? updatedProject : p));
      } else {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectForm)
        });

        if (!response.ok) throw new Error('Failed to create project');
        const createdProject = await response.json();
        setProjects((prev) => [createdProject, ...prev]);
      }

      setIsProjectModalOpen(false);
    } catch (error) {
      console.error('Project save failed:', error);
      alert('Unable to save the project right now. Please try again.');
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project? It will be removed from the live website immediately.")) {
      try {
        const normalizedId = Number(id);
        const response = await fetch(`/api/projects?id=${normalizedId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete project');

        const refreshed = await fetch('/api/projects').then((res) => res.json());
        setProjects(refreshed);
      } catch (error) {
        console.error('Project delete failed:', error);
        alert('Unable to delete the project right now. Please try again.');
      }
    }
  };

  // Delete volunteer submission
  const handleDeleteVolunteer = async (id) => {
    if (window.confirm("Delete this volunteer registration?")) {
      try {
        const normalizedId = Number(id);
        const response = await fetch(`/api/volunteers?id=${normalizedId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete volunteer');

        const refreshed = await fetch('/api/volunteers').then((res) => res.json());
        setVolunteers(refreshed);
      } catch (error) {
        console.error('Volunteer delete failed:', error);
        alert('Unable to delete the volunteer entry right now. Please try again.');
      }
    }
  };

  // Delete contact inquiry
  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Delete this message inquiry?")) {
      try {
        const normalizedId = Number(id);
        const response = await fetch(`/api/contact?id=${normalizedId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete inquiry');

        const refreshed = await fetch('/api/contact').then((res) => res.json());
        setInquiries(refreshed);
      } catch (error) {
        console.error('Inquiry delete failed:', error);
        alert('Unable to delete the inquiry right now. Please try again.');
      }
    }
  };

  // Clear query on tab change
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  return (
    <div className="pt-20 min-h-screen bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Sidebar Navigation */}
          <div className="lg:col-span-3 surface-card dark:bg-dark-card rounded-3xl border border-primary/5 dark:border-dark-border p-6 shadow-lg shadow-primary/8 dark:shadow-sm">
            <h2 className="text-lg font-display font-extrabold text-accent dark:text-accent mb-6 uppercase tracking-wider">
              Control Panel
            </h2>

            <nav className="space-y-2 mb-8">
              {/* Tab Button: Projects */}
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${activeTab === 'projects'
                    ? 'bg-accent text-white dark:bg-accent dark:text-primary-dark shadow'
                    : 'hover:bg-accent/5 dark:hover:bg-dark-bg/60 text-gray-600 dark:text-gray-400'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban size={18} />
                  <span>Manage Projects</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'projects'
                    ? 'bg-white/20 text-white dark:bg-primary/20 dark:text-primary'
                    : 'bg-accent/10 dark:bg-dark-bg text-accent-dark dark:text-gray-500'
                  }`}>
                  {projects.length}
                </span>
              </button>

              {/* Tab Button: Volunteers */}
              <button
                onClick={() => setActiveTab('volunteers')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${activeTab === 'volunteers'
                    ? 'bg-accent text-white dark:bg-accent dark:text-primary-dark shadow'
                    : 'hover:bg-accent/5 dark:hover:bg-dark-bg/60 text-gray-600 dark:text-gray-400'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Users size={18} />
                  <span>Volunteers App</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'volunteers'
                    ? 'bg-white/20 text-white dark:bg-primary/20 dark:text-primary'
                    : 'bg-accent/10 dark:bg-dark-bg text-accent-dark dark:text-gray-500'
                  }`}>
                  {volunteers.length}
                </span>
              </button>

              {/* Tab Button: Contact Inquiries */}
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${activeTab === 'inquiries'
                    ? 'bg-accent text-white dark:bg-accent dark:text-primary-dark shadow'
                    : 'hover:bg-accent/5 dark:hover:bg-dark-bg/60 text-gray-600 dark:text-gray-400'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare size={18} />
                  <span>Messages Inquiries</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'inquiries'
                    ? 'bg-white/20 text-white dark:bg-primary/20 dark:text-primary'
                    : 'bg-accent/10 dark:bg-dark-bg text-accent-dark dark:text-gray-500'
                  }`}>
                  {inquiries.length}
                </span>
              </button>

              {/* Tab Button: Newsletter */}
              <button
                onClick={() => setActiveTab('newsletters')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${activeTab === 'newsletters'
                    ? 'bg-accent text-white dark:bg-accent dark:text-primary-dark shadow'
                    : 'hover:bg-accent/5 dark:hover:bg-dark-bg/60 text-gray-600 dark:text-gray-400'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>Newsletter Subs</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'newsletters'
                    ? 'bg-white/20 text-white dark:bg-primary/20 dark:text-primary'
                    : 'bg-accent/10 dark:bg-dark-bg text-accent-dark dark:text-gray-500'
                  }`}>
                  {newsletters.length}
                </span>
              </button>
            </nav>

            <hr className="border-primary/5 dark:border-dark-border mb-6" />

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-all duration-200 cursor-pointer mb-3"
            >
              <LogOut size={14} />
              <span>Log Out Portal</span>
            </button>

            <button
              onClick={() => setCurrentView('landing')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-dark-bg dark:hover:bg-gray-800 text-gray-800 dark:text-white font-bold text-xs rounded-xl shadow transition-all duration-200 cursor-pointer"
            >
              Exit to Website
            </button>
          </div>

          {/* RIGHT COLUMN: Viewport Area */}
          <div className="lg:col-span-9 surface-card dark:bg-dark-card rounded-3xl border border-primary/5 dark:border-dark-border p-6 sm:p-8 shadow-lg shadow-primary/8 dark:shadow-sm min-h-[500px]">

            {/* SEARCH & TITLE BANNER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/5 dark:border-dark-border pb-6 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-primary dark:text-white capitalize">
                  {activeTab === 'projects' ? 'Welfare Initiatives Portal' :
                    activeTab === 'volunteers' ? 'Registered Volunteer Assets' :
                      activeTab === 'inquiries' ? 'Direct Contact Inquiries' :
                        'Newsletter Subscriber Log'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Local storage mockup environment. Updates persist locally in your browser.
                </p>
              </div>

              {/* Add Project CTA */}
              {activeTab === 'projects' && (
                <button
                  onClick={handleAddProjectClick}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Plus size={16} />
                  <span>Add New Project</span>
                </button>
              )}

              {/* Search Bar for other tabs */}
              {activeTab !== 'projects' && (
                <div className="relative w-full sm:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search records..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl text-xs font-semibold outline-none focus:border-primary dark:focus:border-accent"
                  />
                </div>
              )}
            </div>

            {/* TAB VIEWPORTS */}

            {/* VIEWPORT 1: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-primary/5 dark:border-dark-border text-gray-500 font-bold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">Title & Details</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-gray-50 dark:border-dark-border hover:bg-gray-50/50 dark:hover:bg-dark-bg/20 transition-colors">
                        <td className="py-4 px-4 flex items-center gap-4">
                          <img
                            src={getProjectImageSrc(project.image)}
                            alt={project.title}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            onError={handleProjectImageError}
                          />
                          <div>
                            <h4 className="font-extrabold text-primary dark:text-white line-clamp-1">{project.title}</h4>
                            <p className="text-xs text-primary dark:text-accent font-bold mt-0.5">{project.category || 'Welfare'}</p>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{project.description}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                          {project.location}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${project.status.toLowerCase() === 'ongoing'
                              ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300'
                              : 'bg-green-100 dark:bg-emerald-500/20 text-green-800 dark:text-emerald-300'
                            }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditProjectClick(project)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-accent transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEWPORT 2: VOLUNTEERS */}
            {activeTab === 'volunteers' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-primary/5 dark:border-dark-border text-gray-500 font-bold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Contact Contact</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers
                      .filter(v =>
                        v.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        v.city.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((volunteer, idx) => (
                        <tr key={idx} className="border-b border-gray-50 dark:border-dark-border hover:bg-gray-50/50 dark:hover:bg-dark-bg/20 transition-colors">
                          <td className="py-4 px-4 font-extrabold text-primary dark:text-white">
                            {volunteer.fullName}
                          </td>
                          <td className="py-4 px-4 font-medium text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                            <p className="font-bold text-gray-800 dark:text-gray-200">{volunteer.email}</p>
                            <p>{volunteer.phone}</p>
                          </td>
                          <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                            {volunteer.city}
                          </td>
                          <td className="py-4 px-4 text-xs text-gray-500 max-w-xs truncate" title={volunteer.notes}>
                            {volunteer.notes || '-'}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteVolunteer(volunteer.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Submission"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {volunteers.length === 0 && (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          No volunteers registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEWPORT 3: CONTACT INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-primary/5 dark:border-dark-border text-gray-500 font-bold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">From</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries
                      .filter(i =>
                        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        i.subject.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((inquiry, idx) => (
                        <tr key={idx} className="border-b border-gray-50 dark:border-dark-border hover:bg-gray-50/50 dark:hover:bg-dark-bg/20 transition-colors">
                          <td className="py-4 px-4 font-extrabold text-primary dark:text-white">
                            <p>{inquiry.name}</p>
                            <span className="text-[10px] text-gray-500 font-medium">{inquiry.email}</span>
                          </td>
                          <td className="py-4 px-4 font-bold text-xs text-primary dark:text-accent">
                            {inquiry.subject}
                          </td>
                          <td className="py-4 px-4 text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs whitespace-pre-line" title={inquiry.message}>
                            {inquiry.message}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-gray-500">
                          No messages received.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEWPORT 4: NEWSLETTER */}
            {activeTab === 'newsletters' && (
              <div className="max-w-md">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-primary/5 dark:border-dark-border text-gray-500 font-bold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">Subscriber Email</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters
                      .filter(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((email, idx) => (
                        <tr key={idx} className="border-b border-gray-50 dark:border-dark-border hover:bg-gray-50/50 dark:hover:bg-dark-bg/20 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                            {email}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                if (window.confirm(`Remove subscription for ${email}?`)) {
                                  const updated = newsletters.filter(n => n !== email);
                                  setNewsletters(updated);
                                  localStorage.setItem('one_nation_newsletters', JSON.stringify(updated));
                                }
                              }}
                              className="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer"
                            >
                              Unsubscribe
                            </button>
                          </td>
                        </tr>
                      ))}
                    {newsletters.length === 0 && (
                      <tr>
                        <td colSpan="2" className="py-8 text-center text-gray-500">
                          No subscribers yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* CRUD PROJECT MODAL (ADD & EDIT) */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-dark-card rounded-3xl border border-primary/5 dark:border-dark-border max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors text-gray-500"
              >
                <X size={20} />
              </button>

              <h4 className="text-xl font-display font-extrabold text-primary dark:text-white mb-6">
                {editingProject ? 'Edit Project Details' : 'Add New Welfare Project'}
              </h4>

              <form onSubmit={handleProjectSubmit} className="space-y-4 text-sm font-semibold">

                {/* Project Title */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={projectForm.title}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                  />
                </div>

                {/* Grid location / date / status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Location * (e.g. Abbottabad)</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={projectForm.location}
                      onChange={handleProjectFormChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Date / Month (e.g. October 2026)</label>
                    <input
                      type="text"
                      name="date"
                      value={projectForm.date}
                      onChange={handleProjectFormChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Status</label>
                    <select
                      name="status"
                      value={projectForm.status}
                      onChange={handleProjectFormChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Campaign Category</label>
                    {isCustomCategory ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="category"
                          required
                          autoFocus
                          placeholder="Type category name"
                          value={projectForm.category}
                          onChange={handleProjectFormChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomCategory(false);
                            setProjectForm(prev => ({ ...prev, category: PREDEFINED_CATEGORIES[0] }));
                          }}
                          className="shrink-0 px-3 rounded-xl border border-primary/5 dark:border-dark-border text-xs font-bold text-gray-500 hover:text-primary dark:hover:text-accent cursor-pointer"
                        >
                          List
                        </button>
                      </div>
                    ) : (
                      <select
                        name="category"
                        value={projectForm.category}
                        onChange={handleCategorySelectChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                      >
                        {PREDEFINED_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="__custom__">Other (type manually)</option>
                      </select>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={projectForm.image}
                    onChange={handleProjectFormChange}
                    placeholder="https://... or a Google Drive share link"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                  />
                  <p className="text-[11px] font-medium text-gray-400 mt-1">
                    Google Drive links are auto-converted. Make sure the file's sharing setting is "Anyone with the link".
                  </p>
                </div>

                {/* Brief description */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Short Description * (1-2 sentences)</label>
                  <input
                    type="text"
                    name="description"
                    required
                    value={projectForm.description}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white"
                  />
                </div>

                {/* Detailed description */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Full Detailed Narrative</label>
                  <textarea
                    name="details"
                    rows="3"
                    value={projectForm.details}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/60 border border-primary/5 dark:border-dark-border rounded-xl outline-none focus:border-primary dark:focus:border-accent text-primary dark:text-white resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow cursor-pointer transition-all duration-200"
                >
                  <Check size={18} />
                  <span>Save Project Changes</span>
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
