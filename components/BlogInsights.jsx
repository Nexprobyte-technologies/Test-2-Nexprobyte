'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POSTS } from '@/data/siteContent';

export default function BlogInsights() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web', 'SEO', 'Design', 'Marketing', 'Agency', 'Performance'];

  const filteredPosts =
    selectedCategory === 'All'
      ? POSTS
      : POSTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="section-head reveal-up">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>JOURNAL • IDEAS &amp; STRATEGY</span>
          </div>
          <h2 className="section-title">
            Notes on Building <span className="gradient-text">High-Growth</span> Digital Products
          </h2>
          <p className="section-subtitle">
            Practical thinking on web, software architecture, technical SEO, and conversion marketing — written by the Nexprobyte engineering team in Coimbatore.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="blog-filter-row reveal-up">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`blog-filter-pill ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="blog-grid stagger-group">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="blog-card spotlight-card reveal-up"
              onClick={() => setSelectedPost(post)}
              style={{ cursor: 'pointer' }}
            >
              <div className="blog-card-media">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-card-img"
                  loading="lazy"
                />
                <span className="blog-badge">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{post.date}</span>
                  <span className="meta-sep">•</span>
                  <span>{post.read}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-read-more" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Quick Read &rarr;</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-dedicated-link"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', textDecoration: 'underline' }}
                  >
                    Dedicated Page &nearr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/blog" className="btn-primary-hero">
            View All Technical Articles &amp; Insights &rarr;
          </Link>
        </div>

        {/* Modal Article Reader */}
        {selectedPost && (
          <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="badge-tag">{selectedPost.category} • {selectedPost.read} read</span>
                  <h3 className="modal-title">{selectedPost.title}</h3>
                  <div className="modal-meta">Published on {selectedPost.date} by Nexprobyte Engineering</div>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedPost(null)}
                  aria-label="Close article modal"
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="modal-cover-img"
                />

                <div className="modal-article-content">
                  {selectedPost?.content?.map((item, cIdx) => (
                    <div key={cIdx} className="article-block">
                      {item.h && <h4 className="article-heading">{item.h}</h4>}
                      {item.p && <p className="article-para">{item.p}</p>}
                      {item.links && (
                        <div className="prose-links" style={{ marginTop: '16px', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <span className="prose-links-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', display: 'block', marginBottom: '8px' }}>
                            Recommended resources:
                          </span>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {item.links.map((link, lIdx) => (
                              <li key={lIdx} style={{ marginBottom: '6px' }}>
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.9rem' }}
                                >
                                  {link.label} &nearr;
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href={`/blog/${selectedPost.slug}`}
                  className="btn-outline-hero"
                  onClick={() => setSelectedPost(null)}
                >
                  Open Full Page View &nearr;
                </Link>
                <Link href="/contact" className="btn-primary-hero" onClick={() => setSelectedPost(null)}>
                  Discuss This Strategy With Our Team &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
