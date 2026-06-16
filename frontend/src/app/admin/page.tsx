"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Key, LogOut, MessageSquare, Briefcase, FileText, LayoutGrid, 
  Trash2, RefreshCw, Send, CheckCircle2, UserCheck, Star, ExternalLink, Menu, X, PlusCircle 
} from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function AdminPage() {
  const { user, login, logout, loading, api } = useAuth();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'applications' | 'blogs' | 'projects'>('inquiries');

  // Login Form
  const { register: regLogin, handleSubmit: handleLoginSubmit } = useForm();
  const [loginErr, setLoginErr] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Lists state
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Blog publishing form
  const { register: regBlog, handleSubmit: handleBlogSubmit, reset: resetBlog } = useForm();
  const [blogStatus, setBlogStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [blogMsg, setBlogMsg] = useState<string | null>(null);

  // Project publishing form
  const { register: regProject, handleSubmit: handleProjectSubmit, reset: resetProject } = useForm();
  const [projectStatus, setProjectStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [projectMsg, setProjectMsg] = useState<string | null>(null);

  // Trigger login auth
  const onLogin = async (data: any) => {
    setLoginLoading(true);
    setLoginErr(null);
    try {
      const success = await login(data.emailOrUsername, data.password);
      if (!success) {
        setLoginErr('Authentication failed: Invalid credentials');
      }
    } catch (err: any) {
      setLoginErr(err.response?.data?.message || 'Login request failed. Server might be offline.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Fetch list data
  const fetchData = async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      // Fetch contact inquiries
      const resInq = await api.get('/inquiries');
      if (resInq.data?.success) setInquiries(resInq.data.data);

      // Fetch jobs (to see applications nested inside them)
      const resJobs = await api.get('/careers');
      if (resJobs.data?.success) setJobs(resJobs.data.data);

      // Fetch blogs
      const resBlogs = await api.get('/blogs');
      if (resBlogs.data?.success) setBlogs(resBlogs.data.data);

      // Fetch projects
      const resProj = await api.get('/projects');
      if (resProj.data?.success) setProjects(resProj.data.data);
    } catch (error) {
      console.error('[Admin Dashboard] Error loading list data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Update inquiry status
  const handleUpdateInquiry = async (id: string, status: string) => {
    try {
      const res = await api.put(`/inquiries/${id}`, { status });
      if (res.data?.success) {
        setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status } : inq));
      }
    } catch (error) {
      alert('Failed to update inquiry status');
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to remove this blog post?')) return;
    try {
      const res = await api.delete(`/blogs/${id}`);
      if (res.data?.success) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (error) {
      alert('Failed to delete blog post');
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to remove this project?')) return;
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data?.success) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  // Submit Blog
  const onPublishBlog = async (data: any) => {
    setBlogStatus('idle');
    setBlogMsg(null);
    try {
      const formattedTags = data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [];
      const res = await api.post('/blogs', { ...data, tags: formattedTags });
      if (res.data?.success) {
        setBlogStatus('success');
        setBlogMsg('Blog article published successfully in database!');
        resetBlog();
        fetchData();
      }
    } catch (err: any) {
      setBlogStatus('error');
      setBlogMsg(err.response?.data?.message || 'Publish failed.');
    }
  };

  // Submit Project
  const onPublishProject = async (data: any) => {
    setProjectStatus('idle');
    setProjectMsg(null);
    try {
      const formattedTags = data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [];
      const formattedFeatures = data.features ? data.features.split(',').map((f: string) => f.trim()) : [];
      
      const statsMap: { [key: string]: string } = {};
      if (data.statKey1 && data.statVal1) statsMap[data.statKey1] = data.statVal1;
      if (data.statKey2 && data.statVal2) statsMap[data.statKey2] = data.statVal2;

      const payload = {
        title: data.title,
        client: data.client,
        category: data.category,
        duration: data.duration,
        description: data.description,
        image: data.image,
        link: data.link,
        tags: formattedTags,
        features: formattedFeatures,
        stats: statsMap,
      };

      const res = await api.post('/projects', payload);
      if (res.data?.success) {
        setProjectStatus('success');
        setProjectMsg('Portfolio project published successfully!');
        resetProject();
        fetchData();
      }
    } catch (err: any) {
      setProjectStatus('error');
      setProjectMsg(err.response?.data?.message || 'Publish failed.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <RefreshCw className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // Not Logged In -> Render Login Card
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full glow-primary z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full glow-accent z-0" />

        <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-card border border-card-border shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Key size={22} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Sooftcode Admin Portal</h1>
            <p className="text-muted text-xs">Access database queries, inquiries, and careers lists.</p>
          </div>

          {loginErr && (
            <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs flex items-center space-x-2">
              <span>{loginErr}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-muted">Email or Username</label>
              <input
                type="text"
                required
                placeholder="admin"
                className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none focus:border-primary"
                {...regLogin('emailOrUsername')}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-muted">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none focus:border-primary"
                {...regLogin('password')}
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl btn-liquid text-white font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? <RefreshCw className="animate-spin" size={14} /> : <span>Access Dashboard</span>}
            </button>
          </form>

          <div className="text-center">
            <a href="/" className="text-xs text-muted hover:underline">Back to consumer page</a>
          </div>
        </div>
      </div>
    );
  }

  // Logged In -> Render Admin Dashboard
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      
      {/* Top Header */}
      <header className="border-b border-card-border bg-card/60 backdrop-blur-md px-6 py-4 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
            SC
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base leading-none">Sooftcode Admin</h1>
            <span className="text-[10px] text-green-500 font-semibold flex items-center space-x-1 mt-1">
              <UserCheck size={10} />
              <span>Active Admin: {user.username}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl btn-liquid-secondary text-xs font-semibold text-foreground hover:text-red-500 hover:border-red-500/30 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <LogOut size={12} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main dashboard content */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 sm:p-8 gap-8 items-start">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-card border border-card-border rounded-3xl p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-muted px-2">Navigation Panel</h3>
          
          <div className="flex flex-col space-y-1.5">
            {[
              { id: 'inquiries', label: 'Client Inquiries', count: inquiries.length, icon: MessageSquare },
              { id: 'applications', label: 'Careers Applicants', count: jobs.reduce((acc, curr) => acc + (curr.applications?.length || 0), 0), icon: Briefcase },
              { id: 'blogs', label: 'Write Insights Blog', count: blogs.length, icon: FileText },
              { id: 'projects', label: 'Portfolio Projects', count: projects.length, icon: LayoutGrid }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'hover:bg-background/80 text-muted hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-background border border-card-border text-foreground'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="pt-4 border-t border-card-border/60">
            <a href="/" target="_blank" className="w-full py-2.5 rounded-xl btn-liquid-secondary text-center block text-xs font-semibold transition-all">
              Launch Site Home
            </a>
          </div>
        </aside>

        {/* Dashboard Panels */}
        <main className="flex-grow w-full bg-card border border-card-border rounded-3xl p-6 sm:p-8 min-h-[500px]">
          
          {dataLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <RefreshCw className="animate-spin text-primary" size={24} />
            </div>
          ) : (
            <>
              {/* TAB 1: Inquiries list */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">Contact Form Inquiries</h2>
                    <p className="text-muted text-xs">Review client consultation scoping requests.</p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-16 text-muted text-xs">No client inquiries found in database.</div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div key={inq._id} className="p-5 rounded-2xl bg-background border border-card-border/80 space-y-4 shadow-sm">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <h4 className="font-bold text-foreground text-sm">{inq.subject}</h4>
                              <p className="text-xs text-muted font-medium mt-1">From: {inq.name} ({inq.email})</p>
                            </div>
                            
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiry(inq._id, e.target.value)}
                              className={`text-[10px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                                inq.status === 'Resolved' 
                                  ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                  : inq.status === 'In Progress'
                                  ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                  : 'bg-primary/10 border-primary/20 text-primary'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </div>
                          
                          <p className="text-xs text-muted bg-card p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                            {inq.message}
                          </p>
                          <span className="text-[9px] text-muted block text-right font-medium">Submitted on: {new Date(inq.createdAt).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Applications list */}
              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">Careers Applications</h2>
                    <p className="text-muted text-xs">Review resumes uploaded by job candidates.</p>
                  </div>

                  {jobs.filter(j => j.applications?.length > 0).length === 0 ? (
                    <div className="text-center py-16 text-muted text-xs">No candidate applications found in database.</div>
                  ) : (
                    <div className="space-y-6">
                      {jobs.map((job) => {
                        if (!job.applications || job.applications.length === 0) return null;
                        return (
                          <div key={job._id} className="space-y-3">
                            <h3 className="font-bold text-sm text-primary uppercase tracking-wide px-1">
                              Role: {job.title}
                            </h3>
                            
                            <div className="space-y-3">
                              {job.applications.map((app: any) => (
                                <div key={app._id} className="p-5 rounded-2xl bg-background border border-card-border/80 space-y-3">
                                  <div className="flex justify-between items-center flex-wrap gap-2">
                                    <div>
                                      <h4 className="font-bold text-foreground text-xs">{app.name}</h4>
                                      <p className="text-[10px] text-muted">{app.email} &bull; Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                    
                                    {/* Resume Access Link */}
                                    <a
                                      href={app.resumeUrl.startsWith('http') ? app.resumeUrl : `http://localhost:5000${app.resumeUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 rounded-lg btn-liquid text-white text-[10px] font-bold flex items-center space-x-1"
                                    >
                                      <span>Open Resume</span>
                                      <ExternalLink size={10} />
                                    </a>
                                  </div>
                                  
                                  {app.coverLetter && (
                                    <p className="text-[10px] text-muted bg-card p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                                      {app.coverLetter}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Publish Blog */}
              {activeTab === 'blogs' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">Write & Publish Blog Article</h2>
                    <p className="text-muted text-xs">Publish articles directly to the MongoDB backend database.</p>
                  </div>

                  {blogStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-xs flex items-center space-x-2">
                      <CheckCircle2 size={16} />
                      <span>{blogMsg}</span>
                    </div>
                  )}
                  {blogStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs flex items-center space-x-2">
                      <span>{blogMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleBlogSubmit(onPublishBlog)} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Article Title</label>
                        <input
                          type="text" required placeholder="The Future of Web Compilation"
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regBlog('title')}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Excerpt Summary</label>
                        <input
                          type="text" required placeholder="A short 1-sentence synopsis detailing findings..."
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regBlog('excerpt')}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Category</label>
                          <select
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none cursor-pointer"
                            {...regBlog('category')}
                          >
                            <option value="Web Development">Web Development</option>
                            <option value="Custom Software">Custom Software</option>
                            <option value="Cloud Solutions">Cloud Solutions</option>
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Read Time</label>
                          <input
                            type="text" required placeholder="6 min read"
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                            {...regBlog('readTime')}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Cover Image URL</label>
                        <input
                          type="text" required placeholder="https://images.unsplash.com/photo-..."
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regBlog('coverImage')}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Tags (separated by comma)</label>
                        <input
                          type="text" placeholder="React, Compiler, Next.js"
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regBlog('tags')}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 flex flex-col h-full">
                      <div className="flex flex-col space-y-1.5 flex-grow">
                        <label className="text-xs font-semibold text-muted">Content Body (Markdown supported)</label>
                        <textarea
                          rows={11} required placeholder="Write your markdown paragraphs here..."
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none resize-none flex-grow"
                          {...regBlog('content')}
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl btn-liquid text-white font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                      >
                        <PlusCircle size={14} />
                        <span>Publish Article</span>
                      </button>
                    </div>
                  </form>

                  {/* Active List */}
                  <div className="pt-6 border-t border-card-border/50 space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">Current Database Articles</h3>
                    <div className="divide-y divide-card-border/50">
                      {blogs.map((b) => (
                        <div key={b._id} className="py-3.5 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-foreground">{b.title}</p>
                            <p className="text-[10px] text-muted">{b.category} &bull; {b.readTime}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteBlog(b._id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Publish Portfolio */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">Create Portfolio Project</h2>
                    <p className="text-muted text-xs">Publish case studies dynamically to our portfolio filters database.</p>
                  </div>

                  {projectStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-xs flex items-center space-x-2">
                      <CheckCircle2 size={16} />
                      <span>{projectMsg}</span>
                    </div>
                  )}
                  {projectStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs flex items-center space-x-2">
                      <span>{projectMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleProjectSubmit(onPublishProject)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Project Title</label>
                        <input
                          type="text" required placeholder="Nova Logistics Dashboard"
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regProject('title')}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Client Name</label>
                          <input
                            type="text" required placeholder="Aura Capital Group"
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                            {...regProject('client')}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Category</label>
                          <select
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none cursor-pointer"
                            {...regProject('category')}
                          >
                            <option value="Custom Software">Custom Software</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="SaaS Development">SaaS Development</option>
                            <option value="Cloud Solutions">Cloud Solutions</option>
                            <option value="AI Solutions">AI Solutions</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Duration</label>
                          <input
                            type="text" required placeholder="6 Months"
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                            {...regProject('duration')}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Live Link URL</label>
                          <input
                            type="text" placeholder="https://example.com"
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                            {...regProject('link')}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Cover Image URL</label>
                        <input
                          type="text" required placeholder="https://images.unsplash.com/photo-..."
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regProject('image')}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Project Description</label>
                        <textarea
                          rows={3} required placeholder="Detailed case study explanation..."
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none resize-none"
                          {...regProject('description')}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Deliverables/Features (separated by comma)</label>
                        <input
                          type="text" placeholder="Biometric Login, 10ms WS Sync, vector financial graphs"
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regProject('features')}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Tags (separated by comma)</label>
                        <input
                          type="text" placeholder="React, Node.js, Mongoose, WebSockets"
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          {...regProject('tags')}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-muted">Metric 1 (Key/Value)</label>
                          <div className="flex space-x-1">
                            <input type="text" placeholder="Uptime" className="w-1/2 p-2 text-[10px] rounded bg-background border border-card-border" {...regProject('statKey1')}/>
                            <input type="text" placeholder="99.99%" className="w-1/2 p-2 text-[10px] rounded bg-background border border-card-border" {...regProject('statVal1')}/>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-muted">Metric 2 (Key/Value)</label>
                          <div className="flex space-x-1">
                            <input type="text" placeholder="Efficiency" className="w-1/2 p-2 text-[10px] rounded bg-background border border-card-border" {...regProject('statKey2')}/>
                            <input type="text" placeholder="+40%" className="w-1/2 p-2 text-[10px] rounded bg-background border border-card-border" {...regProject('statVal2')}/>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl btn-liquid text-white font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                      >
                        <PlusCircle size={14} />
                        <span>Publish Project</span>
                      </button>
                    </div>
                  </form>

                  {/* Active List */}
                  <div className="pt-6 border-t border-card-border/50 space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">Current Database Projects</h3>
                    <div className="divide-y divide-card-border/50">
                      {projects.map((p) => (
                        <div key={p._id} className="py-3.5 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-foreground">{p.title}</p>
                            <p className="text-[10px] text-muted">Client: {p.client} &bull; Category: {p.category}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(p._id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </>
          )}

        </main>
      </div>

    </div>
  );
}
