"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, FileText, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { API_URL } from '@/context/AuthContext';

interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    setStatus('idle');
    setServerMsg(null);
    try {
      const response = await axios.post(`${API_URL}/inquiries`, data);
      if (response.data?.success) {
        setStatus('success');
        setServerMsg(response.data.message);
        reset();
      }
    } catch (err: any) {
      setStatus('error');
      setServerMsg(err.response?.data?.message || 'Form submission failed. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 sm:p-10 rounded-3xl bg-card border border-card-border shadow-lg shadow-black/5 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full glow-accent opacity-30 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full glow-primary opacity-30 pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center py-12 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Message Transmitted!</h3>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              {serverMsg || 'Thank you for reaching out. A Senior Consulting Advisor will contact you within 24 business hours.'}
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 px-6 py-2.5 rounded-xl btn-liquid-secondary text-sm font-semibold transition-all cursor-pointer hover:scale-[1.02]"
            >
              Send Another Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 relative z-10"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-foreground">Inquire Consultation</h3>
              <p className="text-muted text-xs">Complete the fields below to initiate project architecture scoping.</p>
            </div>

            {/* Error Message banner */}
            {status === 'error' && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs flex items-center space-x-2.5">
                <AlertCircle size={16} />
                <span>{serverMsg}</span>
              </div>
            )}

            {/* Grid for Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-xs font-semibold text-foreground/80">Full Name</label>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-3.5 text-muted pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Marcus Aurelius"
                    className={`w-full text-sm py-3 pl-10 pr-4 rounded-xl bg-background border ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-input-border focus:border-primary'
                    } focus:outline-none text-foreground transition-colors`}
                    {...register('name', { required: 'Name is required' })}
                  />
                </div>
                {errors.name && <span className="text-red-500 text-[10px]">{errors.name.message}</span>}
              </div>

              {/* Email field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-xs font-semibold text-foreground/80">Corporate Email</label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-muted pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    placeholder="marcus@empire.com"
                    className={`w-full text-sm py-3 pl-10 pr-4 rounded-xl bg-background border ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-input-border focus:border-primary'
                    } focus:outline-none text-foreground transition-colors`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-[10px]">{errors.email.message}</span>}
              </div>
            </div>

            {/* Subject field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="subject" className="text-xs font-semibold text-foreground/80">Inquiry Subject</label>
              <div className="relative flex items-center">
                <FileText size={16} className="absolute left-3.5 text-muted pointer-events-none" />
                <input
                  id="subject"
                  type="text"
                  placeholder="Cloud Infrastructure Migration Scoping"
                  className={`w-full text-sm py-3 pl-10 pr-4 rounded-xl bg-background border ${
                    errors.subject ? 'border-red-500 focus:border-red-500' : 'border-input-border focus:border-primary'
                  } focus:outline-none text-foreground transition-colors`}
                  {...register('subject', { required: 'Subject is required' })}
                />
              </div>
              {errors.subject && <span className="text-red-500 text-[10px]">{errors.subject.message}</span>}
            </div>

            {/* Message field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-xs font-semibold text-foreground/80">Project Description & Goals</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Outline your application features, approximate timelines, or scaling bottlenecks..."
                className={`w-full text-sm p-4 rounded-xl bg-background border ${
                  errors.message ? 'border-red-500 focus:border-red-500' : 'border-input-border focus:border-primary'
                } focus:outline-none text-foreground transition-colors resize-none`}
                {...register('message', { 
                  required: 'Project description is required',
                  minLength: { value: 15, message: 'Message should be at least 15 characters' }
                })}
              />
              {errors.message && <span className="text-red-500 text-[10px]">{errors.message.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl btn-liquid text-white font-medium text-sm flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Transmitting inquiry...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
