'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { POSTS } from '@/data/siteContent';

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web', 'SEO', 'Design', 'Marketing', 'Agency', 'Performance'];

  const filteredPosts =
    selectedCategory === 'All'
      ? POSTS
      : POSTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog & Insights' }]} />
      </div>

      <PageHero
        num="Journal"
        label="Ideas & Insights"
        title={['Notes on Building', 'Digital Businesses']}
        sub="Practical thinking on web architecture, SEO, performance marketing, and conversion growth — written by the Nexprobyte engineering team."
      />

      <section className="section wrap" style={{ paddingTop: '30px' }}>
        <div className="container">
          {/* Category Filter Row */}
          <div className="blog-filter-row">
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

          {/* Posts List */}
          <div className="post-list-wrap">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="post-card-full spotlight-card">
                <div className="post-card-media-box">
                  <img
                    src={post.image || '/images/cover-web.jpg'}
                    alt={post.title}
                    className="post-card-img"
                    loading="lazy"
                  />
                  <span className="post-card-badge">{post.category}</span>
                </div>

                <div className="post-card-content-box">
                  <div className="post-meta-row">
                    <span className="post-meta-date">{post.date}</span>
                    <span className="post-meta-sep">•</span>
                    <span className="post-meta-time">{post.read}</span>
                    <span className="post-meta-sep">•</span>
                    <span className="post-meta-author">Nexprobyte Engineering</span>
                  </div>

                  <h2 className="post-card-heading">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="post-card-excerpt-text">{post.excerpt}</p>

                  <div className="post-card-bottom">
                    <Link href={`/blog/${post.slug}`} className="btn-primary-hero">
                      Read Full Article &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
