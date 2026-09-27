import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../../lib/data/db';
import type { BlogPost } from '../../lib/data/types';
import { useLayerTransition } from '../../context/LayerTransitionContext';
import './Blog.css';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { triggerTransition } = useLayerTransition();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    const foundPost = blogPosts.findBySlug(slug);
    if (!foundPost || foundPost.status !== 'published') {
      navigate('/blog', { replace: true });
      return;
    }

    setPost(foundPost);

    // ── Dynamic SEO head updates ─────────────────────────────────────────────
    const pageTitle = foundPost.seoTitle || `${foundPost.title} | Dominova Blog`;
    const pageDesc  = foundPost.seoDescription || foundPost.excerpt;
    const pageUrl   = `https://dominova.in/blog/${foundPost.slug}`;
    const pageImage = foundPost.coverImage?.startsWith('http')
      ? foundPost.coverImage
      : `https://dominova.in${foundPost.coverImage || '/images/og-image.jpg'}`;

    document.title = pageTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        if (attr === 'name') el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        if (attr === 'property') el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('meta[name="description"]',          'name',     pageDesc);
    setMeta('meta[property="og:title"]',          'property', pageTitle);
    setMeta('meta[property="og:description"]',    'property', pageDesc);
    setMeta('meta[property="og:url"]',            'property', pageUrl);
    setMeta('meta[property="og:image"]',          'property', pageImage);
    setMeta('meta[property="og:type"]',           'property', 'article');
    setMeta('meta[name="twitter:title"]',         'name',     pageTitle);
    setMeta('meta[name="twitter:description"]',   'name',     pageDesc);
    setMeta('meta[name="twitter:image"]',         'name',     pageImage);

    // Canonical for article
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonicalEl?.getAttribute('href') || '';
    if (canonicalEl) canonicalEl.setAttribute('href', pageUrl);

    // ── Article JSON-LD ──────────────────────────────────────────────────────
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': foundPost.title,
      'description': pageDesc,
      'image': pageImage,
      'datePublished': foundPost.publishDate,
      'dateModified': foundPost.publishDate,
      'author': {
        '@type': 'Organization',
        'name': foundPost.author || 'Dominova',
        'url': 'https://dominova.in'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Dominova',
        'url': 'https://dominova.in',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://dominova.in/images/og-image.jpg'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    };

    // ── BreadcrumbList JSON-LD ────────────────────────────────────────────────
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://dominova.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': 'https://dominova.in/blog'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': foundPost.title,
          'item': pageUrl
        }
      ]
    };

    const articleLd = document.createElement('script');
    articleLd.type = 'application/ld+json';
    articleLd.id = 'article-schema';
    articleLd.textContent = JSON.stringify(articleSchema);
    document.head.appendChild(articleLd);

    const breadcrumbLd = document.createElement('script');
    breadcrumbLd.type = 'application/ld+json';
    breadcrumbLd.id = 'breadcrumb-schema';
    breadcrumbLd.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbLd);

    // Find related posts (same tag, exclude current)
    const allPublished = blogPosts.findPublished();
    const related = allPublished
      .filter((p) => p.id !== foundPost.id && p.tags.some((t) => foundPost.tags.includes(t)))
      .slice(0, 3);

    if (related.length < 3) {
      const more = allPublished.filter((p) => p.id !== foundPost.id && !related.find(r => r.id === p.id));
      related.push(...more.slice(0, 3 - related.length));
    }

    setRelatedPosts(related);

    // ── Cleanup: restore all original tags on unmount ─────────────────────────
    return () => {
      document.title = 'Dominova | Web Development, Software Internships, Workshops & Hackathons – Chennai';
      const origDesc = 'Dominova is a Chennai-based technology company offering custom web development, mobile apps, data science, cybersecurity, and cloud services — plus industry-oriented internships, technical workshops, and hackathon programs for students and businesses.';
      const origOgUrl = 'https://dominova.in/';
      const origOgImg = 'https://dominova.in/images/og-image.jpg';
      const origTitle = 'Dominova | Web Development, Software Internships, Workshops & Hackathons – Chennai';

      setMeta('meta[name="description"]',          'name',     origDesc);
      setMeta('meta[property="og:title"]',          'property', origTitle);
      setMeta('meta[property="og:description"]',    'property', origDesc);
      setMeta('meta[property="og:url"]',            'property', origOgUrl);
      setMeta('meta[property="og:image"]',          'property', origOgImg);
      setMeta('meta[property="og:type"]',           'property', 'website');
      setMeta('meta[name="twitter:title"]',         'name',     origTitle);
      setMeta('meta[name="twitter:description"]',   'name',     'Dominova offers custom web development, mobile apps, data science and cybersecurity services — plus real-project internships, technical workshops, and hackathon programs in Chennai.');
      setMeta('meta[name="twitter:image"]',         'name',     origOgImg);

      if (canonicalEl) canonicalEl.setAttribute('href', prevCanonical);

      document.getElementById('article-schema')?.remove();
      document.getElementById('breadcrumb-schema')?.remove();
    };
  }, [slug, navigate]);

  if (!post) return null;

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleBackToBlog = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerTransition('RETURNING TO ARTICLES DIRECTORY', () => {
      navigate('/blog');
    });
  };

  const handleSelectRelated = (relatedSlug: string) => {
    triggerTransition('LOADING ARTICLE ARCHITECTURE', () => {
      navigate(`/blog/${relatedSlug}`);
    });
  };

  const handleCtaNav = (target: string) => {
    triggerTransition('ACCESSING SYSTEM LAYER', () => {
      navigate(target);
    });
  };

  return (
    <main className="article-page" id="main-content">
      {/* Article Header */}
      <header className="article-header">
        <div className="container article-header-container">
          <a href="/blog" onClick={handleBackToBlog} className="article-back-link">
            ← Back to Blog
          </a>
          <span className="blog-card-category">{post.tags[0] || 'Uncategorized'}</span>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="blog-card-meta article-meta">
            <span>By {post.author}</span>
            <span className="blog-card-dot">•</span>
            <span>{formatDate(post.publishDate)}</span>
            <span className="blog-card-dot">•</span>
            <span>{calculateReadTime(post.content)} min read</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-image-wrap">
        <div className="container">
          <img src={post.coverImage} alt={`${post.title} – ${post.tags[0] || 'Dominova Blog'}`} className="article-hero-image" />
        </div>
      </div>

      {/* Article Body */}
      <article className="article-body">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return <h3 key={idx}>{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={idx}>{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(Boolean);
            return (
              <ul key={idx}>
                {items.map((item, i) => (
                  <li key={i}>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                ))}
              </ul>
            );
          }
          const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
        })}
      </article>

      {/* Internship CTA */}
      <section className="article-cta">
        <div className="container">
          <div className="article-cta-box">
            <h2>Ready to turn knowledge into experience?</h2>
            <p>Go beyond tutorials. Work on real projects, learn from industry mentors and build a portfolio that gets noticed.</p>
            <div className="article-cta-actions">
              <button onClick={() => handleCtaNav('/#internship')} className="btn-gold">
                <span>Explore Internships →</span>
              </button>
              <button onClick={() => handleCtaNav('/#contact')} className="btn-white">
                Talk to Dominova →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="article-related">
          <div className="container">
            <h3 className="article-related-title">You may also like</h3>
            <div className="blog-grid">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.id}
                  className="blog-card"
                  onClick={() => handleSelectRelated(rPost.slug)}
                >
                  <div className="blog-card-image-wrap">
                    <img src={rPost.coverImage} alt={`${rPost.title} – Related Article | Dominova Blog`} className="blog-card-image" />
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-card-category">{rPost.tags[0] || 'Uncategorized'}</span>
                    <h3 className="blog-card-title">{rPost.title}</h3>
                    <p className="blog-card-excerpt">{rPost.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(rPost.publishDate)}</span>
                      <span className="blog-card-dot">•</span>
                      <span>{calculateReadTime(rPost.content)} min read</span>
                    </div>
                    <span className="blog-read-cta">Read Article →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
