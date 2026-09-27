import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../../lib/data/db';
import type { BlogPost } from '../../lib/data/types';
import { useLayerTransition } from '../../context/LayerTransitionContext';
import './Blog.css';

const CATEGORIES = [
  'All',
  'Career Tips',
  'Skills',
  'Industry Insights',
  'Web Development',
  'Data Science',
  'Cybersecurity',
];

export default function BlogPage() {
  const navigate = useNavigate();
  const { triggerTransition } = useLayerTransition();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load published posts and sort by publish date
    const published = blogPosts.findPublished().sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    setPosts(published);
  }, []);

  useEffect(() => {
    // ── Blog index page SEO ───────────────────────────────────────────────────
    const blogTitle = 'Technology Blog | Internship Tips, Industry Insights & Career Resources – Dominova';
    const blogDesc  = 'Explore Dominova\'s blog for practical technology insights, internship guidance, web development tips, data science resources, and career advice for students and professionals.';
    const blogUrl   = 'https://dominova.in/blog';

    document.title = blogTitle;

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute('content', value);
    };

    setMeta('meta[name="description"]',        blogDesc);
    setMeta('meta[property="og:title"]',       blogTitle);
    setMeta('meta[property="og:description"]', blogDesc);
    setMeta('meta[property="og:url"]',         blogUrl);
    setMeta('meta[name="twitter:title"]',      blogTitle);
    setMeta('meta[name="twitter:description"]',blogDesc);

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', blogUrl);

    return () => {
      const origTitle = 'Dominova | Web Development, Software Internships, Workshops & Hackathons – Chennai';
      const origDesc  = 'Dominova is a Chennai-based technology company offering custom web development, mobile apps, data science, cybersecurity, and cloud services — plus industry-oriented internships, technical workshops, and hackathon programs for students and businesses.';
      const origUrl   = 'https://dominova.in/';
      document.title  = origTitle;
      setMeta('meta[name="description"]',        origDesc);
      setMeta('meta[property="og:title"]',       origTitle);
      setMeta('meta[property="og:description"]', origDesc);
      setMeta('meta[property="og:url"]',         origUrl);
      setMeta('meta[name="twitter:title"]',      origTitle);
      setMeta('meta[name="twitter:description"]','Dominova offers custom web development, mobile apps, data science and cybersecurity services — plus real-project internships, technical workshops, and hackathon programs in Chennai.');
      if (canonicalEl) canonicalEl.setAttribute('href', origUrl);
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = activeCategory === 'All' || post.tags.includes(activeCategory);
      const query = searchQuery.toLowerCase();
      const matchSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  const handlePostClick = (slug: string, title?: string) => {
    triggerTransition(`ACCESSING ARTICLE: ${(title || slug).toUpperCase()}`, () => {
      navigate(`/blog/${slug}`);
    });
  };

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="blog-page" id="main-content">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <span className="blog-hero__eyebrow">DOMINOVA INSIGHTS</span>
          <h1 className="blog-hero__title">Ideas, Insights & Career Knowledge</h1>
          <p className="blog-hero__subtitle">
            Practical technology insights, internship guidance and career resources built to help students and businesses move forward.
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          {/* Controls: Search & Filter */}
          <div className="blog-controls">
            <div className="blog-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`blog-category-btn ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="blog-search">
              <svg className="blog-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="blog-empty">
              <h3>No articles found</h3>
              <p>Try another keyword or browse all categories.</p>
              <button className="btn-gold" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <article
                  className="blog-featured-card"
                  onClick={() => handlePostClick(featuredPost.slug, featuredPost.title)}
                >
                  <div className="blog-featured-image-wrap">
                    <img src={featuredPost.coverImage} alt={`${featuredPost.title} – Dominova Blog`} className="blog-featured-image" />
                  </div>
                  <div className="blog-featured-content">
                    <span className="blog-card-category">{featuredPost.tags[0] || 'Uncategorized'}</span>
                    <h2 className="blog-featured-title">{featuredPost.title}</h2>
                    <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(featuredPost.publishDate)}</span>
                      <span className="blog-card-dot">•</span>
                      <span>{calculateReadTime(featuredPost.content)} min read</span>
                    </div>
                    <span className="blog-read-cta">Read Article →</span>
                  </div>
                </article>
              )}

              {/* Grid Posts */}
              {gridPosts.length > 0 && (
                <div className="blog-grid">
                  {gridPosts.map((post) => (
                    <article
                      key={post.id}
                      className="blog-card"
                      onClick={() => handlePostClick(post.slug, post.title)}
                    >
                      <div className="blog-card-image-wrap">
                        <img src={post.coverImage} alt={`${post.title} – Dominova Blog`} className="blog-card-image" />
                      </div>
                      <div className="blog-card-content">
                        <span className="blog-card-category">{post.tags[0] || 'Uncategorized'}</span>
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                        <div className="blog-card-meta">
                          <span>{formatDate(post.publishDate)}</span>
                          <span className="blog-card-dot">•</span>
                          <span>{calculateReadTime(post.content)} min read</span>
                        </div>
                        <span className="blog-read-cta">Read Article →</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter (UI Only) */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="blog-newsletter-inner">
            <h3 className="blog-newsletter-title">Stay Ahead of the Curve</h3>
            <p className="blog-newsletter-desc">
              Get practical technology insights, internship opportunities and career resources from Dominova.
            </p>
            <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required disabled title="Newsletter functionality coming soon" />
              <button type="button" className="btn-gold" disabled title="Newsletter functionality coming soon">
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
