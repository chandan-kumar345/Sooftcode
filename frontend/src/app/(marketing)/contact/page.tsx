"use client";

import React from 'react';
import { Mail, Phone, Clock, MapPin, Globe } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const contactChannels = [
  {
    icon: Mail,
    label: "Email Channels",
    items: [
      { name: "General Inquiries", val: "sooftcode@gmail.com" },
      { name: "Client Consultations", val: "sooftcode@gmail.com" },
      { name: "Careers & HR Team", val: "sooftcode@gmail.com" }
    ]
  },
  {
    icon: Phone,
    label: "Phone Lines",
    items: [
      { name: "Global Operations Desk", val: "+91 9709593705" },
      { name: "Support Escalations", val: "+91 9709593705" }
    ]
  },
  {
    icon: Clock,
    label: "Business Hours",
    items: [
      { name: "Consulting Support", val: "Monday - Friday, 9am - 6pm EST" },
      { name: "Emergency SLA Support", val: "24/7/365 active monitoring" }
    ]
  }
];

export default function ContactPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Book a Technical Consultation
          </h1>
          <p className="text-muted text-base sm:text-lg">
            Connect directly with our senior consulting advisors to map application features, estimate dev timelines, or audit systems.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Channels column (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Direct Access Channels</h2>
              <p className="text-muted text-xs leading-relaxed">
                Choose the direct contact channels below if you have immediate contracting questions, resume submissions, or active system emergencies.
              </p>
            </div>

            <div className="space-y-6">
              {contactChannels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-card border border-card-border shadow-sm flex space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <div className="space-y-3 flex-grow">
                      <h4 className="font-bold text-foreground text-sm tracking-wide">{channel.label}</h4>
                      <ul className="space-y-2">
                        {channel.items.map((item, ii) => (
                          <li key={ii} className="text-xs text-muted flex justify-between">
                            <span className="font-semibold text-foreground/80">{item.name}:</span>
                            <span>{item.val}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Office Info card */}
            <div className="p-6 rounded-2xl border border-dashed border-card-border bg-card/20 space-y-4">
              <h4 className="font-bold text-foreground text-sm flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span>Global Office Hub</span>
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                Suite 800, Tech Towers,
                <br />
                100 Broadway, New York, NY 10005
              </p>
              
              <div className="flex items-center space-x-2 text-xs text-muted pt-2">
                <Globe size={14} />
                <span>On-site visits scheduled by email appointment.</span>
              </div>
            </div>
          </div>

          {/* Form column (Right) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
}
