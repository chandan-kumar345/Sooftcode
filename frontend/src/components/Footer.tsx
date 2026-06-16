"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Code2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_URL } from '@/context/AuthContext';
import BrandLogo from '@/components/BrandLogo';

interface NewsletterForm {
  email: string;
}

export default function Footer() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterForm>();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (data: NewsletterForm) => {
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const response = await axios.post(`${API_URL}/inquiries/subscribe`, { email: data.email });
      if (response.data?.success) {
        setSuccessMsg(response.data.message);
        reset();
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Subscription failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-card border-t border-card-border transition-colors duration-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <BrandLogo />
          </Link>
          <p className="text-muted text-sm leading-relaxed">
            Architecting premium software solutions and cloud infrastructures for scaling enterprises. Transforming complex concepts into simple, elegant digital systems.
          </p>
        </div>

        {/* Services Column */}
        <div>
          <h3 className="font-bold text-sm text-foreground tracking-wider uppercase mb-5">Services</h3>
          <ul className="space-y-3 text-sm">
            {[
              'Custom Software Development',
              'Web App Development',
              'Mobile App Development',
              'SaaS Solutions & Development',
              'Cloud Architecting & DevSecOps',
              'QA Automation & Testing',
              'AI Solutions Integration'
            ].map((srv) => (
              <li key={srv}>
                <Link href="/services" className="text-muted hover:text-primary transition-colors">
                  {srv}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-bold text-sm text-foreground tracking-wider uppercase mb-5">Company</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: 'About Us', path: '/about' },
              { name: 'Services Showcase', path: '/services' },
              { name: 'Our Portfolio', path: '/portfolio' },
              { name: 'Careers & Jobs', path: '/careers' },
              { name: 'Insights & Blog', path: '/blog' },
              { name: 'Contact Inquiry', path: '/contact' }
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.path} className="text-muted hover:text-primary transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Contact Info Column */}
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="font-bold text-sm text-foreground tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-muted text-xs leading-relaxed mb-4">
              Get the latest insights on tech trends, architecture strategies, and cloud optimization directly in your inbox.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter email address"
                className={`w-full text-sm py-2.5 pl-4 pr-10 rounded-xl bg-background border ${
                  errors.email ? 'border-red-500' : 'border-input-border'
                } focus:outline-none focus:border-primary text-foreground`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                })}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1 p-2 rounded-lg bg-primary hover:bg-secondary text-white transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
            )}
            
            {/* Status messages */}
            {successMsg && (
              <div className="flex items-center space-x-1.5 text-green-500 text-xs mt-2.5">
                <CheckCircle2 size={12} />
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="flex items-center space-x-1.5 text-red-500 text-xs mt-2.5">
                <AlertCircle size={12} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted leading-relaxed">
            <span className="font-semibold text-foreground">Global HQ:</span> Suite 800, Tech Towers, New York, NY
            <br />
            <span className="font-semibold text-foreground">Inquiries:</span> contact@sooftcode.com
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Sooftcode. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/admin" className="hover:text-primary transition-colors font-semibold text-foreground">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}
