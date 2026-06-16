"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, DollarSign, Calendar, Upload, X, 
  CheckCircle2, Sparkles, RefreshCw, AlertCircle, HelpCircle 
} from 'lucide-react';
import { API_URL } from '@/context/AuthContext';

// Local jobs fallback
const fallbackJobs = [
  {
    _id: '1',
    title: 'Senior Full-Stack Engineer (Next.js & Node)',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    salaryRange: '$130k - $165k',
    description: 'We are seeking a senior-level Full-Stack Developer to lead the development of our enterprise client web applications, dashboard modules, and API integrations.',
    requirements: [
      '5+ years experience building production React & Node applications',
      'Expertise in Next.js (App Router, ISR/SSG, middleware routing)',
      'Thorough knowledge of MongoDB, Mongoose schemas, and database query profiling',
      'Strong communication skills and experience working in agile environments',
    ],
    benefits: [
      'Fully remote work policy with $2,000 office setup allowance',
      'Unlimited Paid Time Off (PTO) with a mandatory 3-week minimum',
      'Comprehensive premium family medical, dental, and vision coverages',
      'Annual training & certifications budget',
    ],
  },
  {
    _id: '2',
    title: 'Lead Cloud Infrastructure Architect',
    department: 'Engineering',
    location: 'Hybrid (New York)',
    type: 'Full-time',
    salaryRange: '$160k - $200k',
    description: 'We are looking for a cloud architect to lead our devops operations, designing high-availability multi-region cluster architectures and automating security checking protocols.',
    requirements: [
      'AWS Certified Solutions Architect (Professional level)',
      '3+ years managing production Kubernetes environments',
      'In-depth knowledge of Terraform Infrastructure as Code (IaC) architectures',
      'Experience setting up Prometheus, Grafana, and ELK monitoring stacks',
    ],
    benefits: [
      'Top-tier salary with yearly bonus structures and equity allocation',
      'Chelsea-based modern office space with fully stocked kitchen',
      'Matched 401(k) retirement options up to 5%',
      'Premium gym and wellness memberships fully covered',
    ],
  },
  {
    _id: '3',
    title: 'Senior UI/UX Visual Designer',
    department: 'Design',
    location: 'Remote (USA or Europe)',
    type: 'Full-time',
    salaryRange: '$100k - $130k',
    description: 'Join our design system team to design stunning, premium client interface layouts, micro-interactions, components, and detailed brand guides.',
    requirements: [
      '4+ years UI/UX visual design experience with an active, stunning design portfolio',
      'Advanced Figma proficiency (autolayout, interactive component states, variable tokens)',
      'Experience designing custom graphics, SVG configurations, and vector animations',
      'Understanding of HTML/CSS/Tailwind styles is a solid benefit',
    ],
    benefits: [
      'Top-tier Apple hardware (MacBook Pro + Studio display configuration)',
      'Flexible working hours with core team alignment hours',
      '$150 monthly health & wellness allowance',
      'Two annual fully paid company retreats to resort locations',
    ],
  },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeJob, setActiveJob] = useState<any | null>(null);

  // Application form state
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/careers`);
        if (response.data?.success && response.data?.data?.length > 0) {
          setJobs(response.data.data);
        } else {
          setJobs(fallbackJobs);
        }
      } catch (error) {
        console.warn('[Careers] API Offline, loaded fallbacks.', error);
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setSubmitStatus('error');
      setServerMsg('Please attach your PDF/DOC resume file.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    setServerMsg(null);

    try {
      const formData = new FormData();
      formData.append('name', appForm.name);
      formData.append('email', appForm.email);
      formData.append('coverLetter', appForm.coverLetter);
      formData.append('resume', resumeFile);

      const response = await axios.post(`${API_URL}/careers/${activeJob._id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.success) {
        setSubmitStatus('success');
        setServerMsg(response.data.message);
        setAppForm({ name: '', email: '', coverLetter: '' });
        setResumeFile(null);
      }
    } catch (err: any) {
      setSubmitStatus('error');
      setServerMsg(err.response?.data?.message || 'Application upload failed. Please verify your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const departments = ['All', 'Engineering', 'Design'];
  const filteredJobs = jobs.filter((job) => selectedDept === 'All' || job.department.toLowerCase() === selectedDept.toLowerCase());

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Careers at Sooftcode
          </h1>
          <p className="text-muted text-base sm:text-lg">
            Build systems that matter. Work remotely with modern tools, competitive salaries, and high design standards.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="space-y-12">
          <h2 className="text-2xl font-bold text-center text-foreground">Why You'll Love It Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Remote-First Flexibility", desc: "Work from anywhere in the world. We structure operations around core communication windows rather than rigid hours." },
              { title: "Workstation budget", desc: "$2,000 allowance on boot to configure custom layouts, monitors, or ergonomics setups." },
              { title: "Unlimited Time Off", desc: "Mandatory minimum of 3 weeks per year. We balance sprint targets with rest requirements." },
              { title: "Continuous Learning", desc: "Annual professional development stipends ($2,000) for course materials, books, or certifications." }
            ].map((b, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-card-border shadow-sm space-y-3">
                <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings Area */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-card-border/60 pb-6">
            <h2 className="text-2xl font-bold text-foreground">Open Positions</h2>
            
            {/* Department filters */}
            <div className="flex items-center space-x-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-primary text-white shadow-sm shadow-primary/20'
                      : 'bg-card border border-card-border text-muted hover:text-foreground'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-card border border-card-border animate-pulse" />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="mx-auto text-muted w-10 h-10" />
              <p className="text-muted text-xs mt-3">No active jobs located under this department category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => {
                    setActiveJob(job);
                    setSubmitStatus('idle');
                    setServerMsg(null);
                  }}
                  className="p-6 sm:p-8 rounded-2xl bg-card border border-card-border hover:border-primary/40 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 cursor-pointer hover:scale-[1.005]"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{job.department}</span>
                    <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-muted">
                      <span className="flex items-center space-x-1.5">
                        <MapPin size={12} />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <Briefcase size={12} />
                        <span>{job.type}</span>
                      </span>
                      {job.salaryRange && (
                        <span className="flex items-center space-x-1.5">
                          <DollarSign size={12} />
                          <span>{job.salaryRange}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="px-5 py-2.5 rounded-xl btn-liquid-secondary text-xs font-bold transition-all cursor-pointer self-start sm:self-auto">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Application / Job Details Modal */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl bg-card border border-card-border shadow-2xl overflow-y-auto max-h-[85vh] z-10 p-8 flex flex-col"
            >
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-card-border hover:bg-background text-foreground transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">{activeJob.department}</span>
                  <h2 className="text-2xl font-extrabold text-foreground mt-1">{activeJob.title}</h2>
                  <p className="text-muted text-xs mt-2">{activeJob.location} &bull; {activeJob.type} &bull; {activeJob.salaryRange}</p>
                </div>

                {/* Job Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-y border-card-border/60">
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Role Description</h4>
                    <p className="text-muted text-xs leading-relaxed">{activeJob.description}</p>

                    <h4 className="font-bold text-xs uppercase tracking-wider text-foreground pt-2">Requirements</h4>
                    <ul className="space-y-2">
                      {activeJob.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="text-xs text-muted flex items-start space-x-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Benefits & Compensation</h4>
                    <ul className="space-y-2">
                      {activeJob.benefits.map((ben: string, idx: number) => (
                        <li key={idx} className="text-xs text-muted flex items-start space-x-2 leading-relaxed">
                          <CheckCircle2 size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Form application */}
                <form onSubmit={handleApplySubmit} className="space-y-6 pt-4">
                  <h3 className="font-extrabold text-foreground text-sm">Apply for this Role</h3>

                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-xs flex items-center space-x-2">
                      <CheckCircle2 size={16} />
                      <span>{serverMsg}</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs flex items-center space-x-2">
                      <AlertCircle size={16} />
                      <span>{serverMsg}</span>
                    </div>
                  )}

                  {submitStatus !== 'success' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={appForm.name}
                            onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold text-muted">Email</label>
                          <input
                            type="email"
                            required
                            placeholder="john@doe.com"
                            value={appForm.email}
                            onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                            className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted">Cover Letter / Message</label>
                        <textarea
                          rows={3}
                          placeholder="Brief introduction or experience highlights..."
                          value={appForm.coverLetter}
                          onChange={(e) => setAppForm({ ...appForm, coverLetter: e.target.value })}
                          className="text-xs p-3 rounded-xl bg-background border border-input-border text-foreground focus:outline-none resize-none"
                        />
                      </div>

                      {/* Resume File upload container */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-xs font-semibold text-muted">Attach Resume (PDF, DOC, DOCX - Max 5MB)</label>
                        <div className="border border-dashed border-input-border rounded-xl p-6 text-center cursor-pointer hover:bg-background/40 transition-colors relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                setResumeFile(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload className="mx-auto text-muted w-8 h-8 mb-2" />
                          <p className="text-xs font-semibold text-foreground">
                            {resumeFile ? resumeFile.name : 'Click to select file or drag here'}
                          </p>
                          <p className="text-[10px] text-muted mt-1">PDF, DOC, DOCX formats supported</p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl btn-liquid text-white font-semibold text-xs flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer hover:scale-[1.005] active:scale-[0.995]"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            <span>Uploading application...</span>
                          </>
                        ) : (
                          <span>Submit Application</span>
                        )}
                      </button>
                    </div>
                  )}

                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
