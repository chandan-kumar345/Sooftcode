"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronRight } from 'lucide-react';
import { API_URL } from '@/context/AuthContext';

// Local blog fallbacks database
const fallbackBlogs = [
  {
    title: 'The Shift to Headless Architecture in Enterprise Projects',
    slug: 'shift-to-headless-architecture-enterprise',
    excerpt: 'Why modern scaling companies are moving away from traditional CMS setups like WordPress to Next.js headless environments for superior speed, security, and developer experience.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Headless CMS', 'Web Performance'],
    author: 'Elena Rostova (Lead Architect)',
    readTime: '6 min read',
    publishedAt: '2026-06-12T10:00:00Z',
    content: `## Why Monoliths are Falling Behind

For years, monolithic CMS platforms like WordPress, Drupal, and Joomla powered the web. They provided a unified interface where templates, backend logic, and databases lived in one box. However, as the digital ecosystem scaled, these platforms created three major problems:

1. **Slow Page Loads**: The server has to process database queries and compile templates on every single request.
2. **Security Vulnerabilities**: Plugins, custom scripts, and monolith cores are constant targets for malicious attacks.
3. **Restricted Frontend Control**: Frontends are tightly coupled with the backend, limiting developers from utilizing modern tools like Tailwind CSS or advanced React architectures.

### Enter Headless Architecture

In a headless architecture, the frontend (the "head") is decoupled from the backend content storage (the "body"). They communicate entirely via fast, secure APIs.

Here are the key reasons why Sooftcode leverages headless React/Next.js for enterprise solutions:

* **Insane Performance**: Next.js uses Static Site Generation (SSG) and Incremental Static Regeneration (ISR) to compile HTML at build time, serving static pages instantly via CDNs.
* **Hardened Security**: Since there is no database connected directly to the user-facing web server, the attack surface is effectively reduced to zero.
* **Omnichannel Content**: Write your copy once in a CMS or database and consume it on web browsers, mobile apps, smart watches, and IoT terminals alike.

### Transitioning Effortlessly

Moving to headless doesn't mean starting from scratch or training your writers on coding. Modern headless CMS options (like Contentful, Sanity, or Strapi) provide beautiful editing dashboards, while Next.js handles the lightning-fast delivery. At Sooftcode, we build high-speed custom static layouts that hook into whichever content source you prefer, ensuring your organization achieves a 100/100 Lighthouse score.
`
  },
  {
    title: 'Securing Node.js Express APIs: A Practical Production Guide',
    slug: 'securing-nodejs-express-apis-production-guide',
    excerpt: 'A checklist of critical configurations to harden your backend servers, mitigate rate-limit leaks, prevent SQL/NoSQL injection, and safely encrypt JWT payloads.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Custom Software',
    tags: ['Express', 'Node.js', 'API Security', 'JWT'],
    author: 'Marcus Vance (SecOps Specialist)',
    readTime: '8 min read',
    publishedAt: '2026-06-10T12:00:00Z',
    content: `## Securing Node.js APIs

Node.js combined with Express is a stellar framework for creating high-performance microservices. However, standard Express installations are highly verbose and insecure out of the box. Below is the production-grade checklist that Sooftcode implements for all server architectures.

### 1. Hardening Headers with Helmet

Helmet is a middleware that sets HTTP headers to guard against common vulnerabilities like cross-site scripting (XSS), clickjacking, and mime-type sniffing.

\`\`\`javascript
import helmet from 'helmet';
app.use(helmet());
\`\`\`

This automatically hides the \`X-Powered-By: Express\` response header, preventing attackers from identifying your tech stack.

### 2. Guarding Against DDoS with Rate Limiting

Without rate limiting, malicious users can trigger heavy database operations indefinitely, causing server memory exhaustion.

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests'
});

app.use('/api/', limiter);
\`\`\`

### 3. JWT Best Practices

JSON Web Tokens (JWT) are crucial for stateless authorization, but they must be handled correctly:
* **Never store sensitive data** (like passwords, roles, or phone numbers) in the JWT payload. It is base64 encoded and readable by anyone.
* **Keep expiration times short** (e.g., 15 minutes for access tokens) and implement secure refresh tokens.
* **Store tokens securely** on the client side using HTTP-only secure cookies rather than LocalStorage to prevent XSS theft.
`
  },
  {
    title: 'Scaling Kubernetes Clusters for High Traffic Events',
    slug: 'scaling-kubernetes-clusters-high-traffic-events',
    excerpt: 'How we configured auto-scaling node groups, established request thresholds, and tuned Prometheus trackers to handle a 10x traffic spike for Aura Capital.',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Solutions',
    tags: ['Kubernetes', 'AWS', 'DevOps', 'Docker', 'Cloud'],
    author: 'Rajesh Nair (VP DevOps)',
    readTime: '10 min read',
    publishedAt: '2026-06-08T09:30:00Z',
    content: `## Navigating Major Scaling Challenges

When preparing for heavy user spikes (such as product launches, stock trading windows, or black Friday events), waiting for servers to boot up manually is a recipe for system crashes. Kubernetes excels at orchestrating resources, but only when configured with proper auto-scaling formulas.

### 1. Horizontal Pod Autoscaler (HPA)

HPA automatically adjusts the number of replica pods running in your cluster based on CPU utilization or memory metrics.

For Aura Capital, we set CPU limits to trigger scaling at 70% threshold:
* Min Replicas: 3 Pods
* Max Replicas: 50 Pods

### 2. Node Group Cluster Autoscaling

Scaling pods is useless if your physical servers run out of CPU capacity. The Cluster Autoscaler works closely with AWS EC2 Auto Scaling Groups to provision fresh physical EC2 nodes automatically when pods enter a "Pending" schedule state.

### 3. Tuning Resource Budgets

Pods must specify explicit \`requests\` (minimum resources required) and \`limits\` (maximum resources allowed). Underestimating requests can cause node overloading, while overestimating them leads to wasted hosting budget.

At Sooftcode, we run load tests using tools like k6 to pinpoint exactly how much memory and CPU core fractions our applications require under pressure. This ensures we configure highly resilient cluster ecosystems that cost less and perform flawlessly.
`
  }
];

// Helper to convert Markdown contents to HTML components dynamically
function parseMarkdown(markdown: string) {
  if (!markdown) return null;
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  return lines.map((line, idx) => {
    // Check for code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const code = codeBlockContent.join('\n');
        codeBlockContent = [];
        return (
          <pre key={idx} className="p-4 rounded-xl bg-background border border-card-border overflow-x-auto text-xs font-mono my-4 text-primary">
            <code>{code}</code>
          </pre>
        );
      } else {
        inCodeBlock = true;
        return null;
      }
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return null;
    }

    // Headers
    if (line.startsWith('## ')) {
      return <h2 key={idx} className="text-2xl font-extrabold text-foreground mt-8 mb-4">{line.replace('## ', '')}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={idx} className="text-xl font-bold text-foreground mt-6 mb-3">{line.replace('### ', '')}</h3>;
    }

    // Bullet points
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <ul key={idx} className="list-disc pl-6 my-2 text-sm text-muted">
          <li>{line.substring(2)}</li>
        </ul>
      );
    }

    // Ordered lists
    if (/^\d+\.\s/.test(line)) {
      return (
        <ol key={idx} className="list-decimal pl-6 my-2 text-sm text-muted">
          <li>{line.replace(/^\d+\.\s/, '')}</li>
        </ol>
      );
    }

    // Blank lines
    if (line.trim() === '') {
      return <div key={idx} className="h-2" />;
    }

    // Default paragraph
    return <p key={idx} className="text-sm text-muted leading-relaxed mb-4">{line}</p>;
  });
}

export default function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const slug = params?.slug;
      if (!slug) return;
      try {
        const response = await axios.get(`${API_URL}/blogs/${slug}`);
        if (response.data?.success) {
          setBlog(response.data.data);
        } else {
          const found = fallbackBlogs.find((b) => b.slug === slug);
          setBlog(found || null);
        }
      } catch (error) {
        console.warn('[Blog Detail] API Offline, fetching local static array');
        const found = fallbackBlogs.find((b) => b.slug === slug);
        setBlog(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-6 animate-pulse">
        <div className="h-8 w-2/3 bg-card rounded-md" />
        <div className="h-4 w-1/4 bg-card rounded-md" />
        <div className="h-96 bg-card rounded-3xl" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Blog Post Not Found</h2>
        <p className="text-muted text-sm">We are unable to locate the requested insights post.</p>
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-bold text-primary hover:underline"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          <span>Back to insights index</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-10">
      {/* Navigation breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/blog" className="hover:text-primary transition-colors">Insights</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-semibold truncate max-w-[200px]">{blog.title}</span>
      </div>

      {/* Blog header */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[1.15] tracking-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-muted py-2 border-y border-card-border/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {blog.author[0]}
            </div>
            <span className="font-semibold text-foreground">{blog.author}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Calendar size={13} />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Clock size={13} />
            <span>{blog.readTime}</span>
          </div>

          <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-[10px] tracking-wide uppercase">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Cover image banner */}
      <div className="h-[300px] sm:h-[400px] rounded-3xl overflow-hidden bg-muted border border-card-border shadow-md">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content Area */}
      <div className="prose max-w-none pt-4">
        {parseMarkdown(blog.content)}
      </div>

      {/* Tags row */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-8 border-t border-card-border/60">
          {blog.tags.map((tag: string) => (
            <span key={tag} className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-card border border-card-border text-xs text-muted">
              <Tag size={10} />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Back navigation */}
      <div className="pt-8 flex justify-start">
        <button
          onClick={() => router.push('/blog')}
          className="inline-flex items-center px-5 py-2.5 rounded-xl btn-liquid-secondary font-semibold text-xs transition-all cursor-pointer"
        >
          <ArrowLeft size={14} className="mr-1.5" />
          <span>Back to Insights index</span>
        </button>
      </div>

    </article>
  );
}
