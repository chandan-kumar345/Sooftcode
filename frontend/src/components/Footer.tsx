"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { API_URL } from '@/context/AuthContext';
import BrandLogo from '@/components/BrandLogo';
import { FooterBackgroundGradient, TextHoverEffect } from '@/components/ui/hover-footer';

// Custom inline SVGs for brand icons since they are removed from modern lucide-react versions
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const DribbbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);


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

  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Custom Software Development", href: "/services" },
        { label: "Web App Development", href: "/services" },
        { label: "Mobile App Development", href: "/services" },
        { label: "SaaS Solutions & Development", href: "/services" },
        { label: "Cloud Architecting & DevSecOps", href: "/services" },
        { label: "QA Automation & Testing", href: "/services" },
        { label: "AI Solutions Integration", href: "/services" }
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services Showcase", href: "/services" },
        { label: "Our Portfolio", href: "/portfolio" },
        { label: "Careers & Jobs", href: "/careers", pulse: true },
        { label: "Insights & Blog", href: "/blog" },
        { label: "Contact Inquiry", href: "/contact" }
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} className="text-primary" />,
      text: "hello@sooftcode.com",
      href: "mailto:hello@sooftcode.com",
    },
    {
      icon: <Phone size={16} className="text-primary" />,
      text: "+91 86373 73116",
      href: "tel:+918637373116",
    },
    {
      icon: <MapPin size={16} className="text-primary" />,
      text: "Suite 800, Tech Towers, New York, NY",
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, label: "Facebook", href: "#" },
    { icon: <InstagramIcon />, label: "Instagram", href: "#" },
    { icon: <TwitterIcon />, label: "Twitter", href: "#" },
    { icon: <DribbbleIcon />, label: "Dribbble", href: "#" },
    { icon: <Globe size={18} />, label: "Globe", href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card/30 border-t border-card-border/80 relative h-fit rounded-t-[2.5rem] overflow-hidden pt-16 pb-8 transition-colors duration-300 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <BrandLogo />
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Architecting premium software solutions and cloud infrastructures for scaling enterprises. Transforming complex concepts into simple, elegant digital systems.
            </p>
          </div>

          {/* Footer links mapping */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground text-sm font-bold tracking-wider uppercase mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <Link
                      href={link.href}
                      className="text-muted hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter & Contact Column */}
          <div className="flex flex-col space-y-6">
            <div>
              <h4 className="text-foreground text-sm font-bold tracking-wider uppercase mb-4">
                Newsletter
              </h4>
              <p className="text-muted text-xs leading-relaxed mb-4">
                Get the latest insights on tech trends, architecture strategies, and cloud optimization.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center mb-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className={`w-full text-xs py-2.5 pl-4 pr-10 rounded-xl bg-background border ${
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
                  className="absolute right-1 p-2 rounded-lg bg-primary hover:bg-primary/95 text-white transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send size={12} />
                </button>
              </form>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
              )}
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

            {/* Direct Contact info */}
            <ul className="space-y-3 text-xs">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-2.5 text-muted">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* SVG Text hover effect */}
        <div className="lg:flex hidden h-[18rem] relative select-none mt-8 mb-4">
          <TextHoverEffect text="SOOFTCODE" className="z-10" />
        </div>

        <hr className="border-t border-card-border/60 my-6" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted space-y-4 md:space-y-0 relative z-20">
          {/* Social icons */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-primary transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Policy & Admin Links */}
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-primary transition-colors font-semibold text-foreground">Admin Portal</Link>
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Sooftcode. All rights reserved.
          </p>
        </div>
      </div>

      <FooterBackgroundGradient />
    </motion.footer>
  );
}
