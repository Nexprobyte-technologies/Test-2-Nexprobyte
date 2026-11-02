import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { POSTS } from '@/data/siteContent';

export function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found — Nexprobyte' };

  return {
    title: `${post.title} | ${post.category} — Nexprobyte Coimbatore`,
    description: post.excerpt,
    keywords: `digital marketing Coimbatore, software company blog, SEO insights, web development tips, ${post.category}`,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: post.title },
          ]}
        />
      </div>

      <PageHero
        num={post.category || 'Article'}
        label={`${post.date} · ${post.read}`}
        title={[post.title]}
        sub={post.excerpt}
      />

      {/* Article Cover Media */}
      <section className="section wrap" style={{ paddingTop: '30px' }}>
        <div className="container">
          <div className="post-cover-frame">
            <img
              src={post.image || '/images/cover-web.jpg'}
              alt={post.title}
              className="post-cover-image"
            />
            <span className="post-cover-badge">{post.category}</span>
          </div>
        </div>
      </section>

      {/* Article Content & Author Sidebar */}
      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="prose-layout-grid">
            {/* Author / Metadata Sidebar */}
            <aside className="prose-sidebar">
              <div className="author-card spotlight-card">
                <img
                  src="/images/testimonial.jpg"
                  alt="Nexprobyte Team"
                  className="author-avatar"
                />
                <div className="author-details">
                  <h4 className="author-name">Nexprobyte Engineering</h4>
                  <span className="author-role">Digital Strategy &amp; Architecture</span>
                  <p className="author-bio">
                    Technical team in Coimbatore specializing in web performance, technical SEO, and scalable application stacks.
                  </p>
                </div>
              </div>

              <div className="article-toc spotlight-card" style={{ marginTop: '20px' }}>
                <span className="toc-title">IN THIS GUIDE</span>
                <ul className="toc-list">
                  {post.content
                    .filter((item) => item.h)
                    .map((item, idx) => (
                      <li key={idx} className="toc-item">
                        ✦ {item.h}
                      </li>
                    ))}
                </ul>
              </div>
            </aside>

            {/* Article Prose Body */}
            <div className="prose-article-body">
              {post.content.map((item, idx) => (
                <div key={idx} className="prose-block">
                  {item.h && <h2 className="prose-heading">{item.h}</h2>}
                  {item.p && <p className="prose-para">{item.p}</p>}
                  {item.ul && (
                    <ul className="prose-list">
                      {item.ul.map((li, lIdx) => (
                        <li key={lIdx}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {item.links && (
                    <div className="prose-links-card spotlight-card">
                      <span className="prose-links-title">Recommended resources:</span>
                      <ul className="prose-links-list">
                        {item.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="prose-resource-link"
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

              {/* Bottom Post Consultation Callout */}
              <div className="post-end-cta spotlight-card">
                <h3 className="end-cta-title">Need help implementing these strategies?</h3>
                <p className="end-cta-desc">
                  Our team in Coimbatore can audit your current infrastructure and formulate a bespoke execution roadmap for your business.
                </p>
                <Link href="/contact" className="btn-primary-hero">
                  Book a Technical Strategy Session &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keep Reading Section */}
      <section className="section wrap" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>RECOMMENDED READING</span>
            </div>
            <h2 className="section-title">Keep Reading More Insights</h2>
          </div>

          <div className="related-posts-grid">
            {relatedPosts.map((rp) => (
              <article key={rp.slug} className="related-post-card spotlight-card">
                <div className="rp-media">
                  <img src={rp.image || '/images/cover-web.jpg'} alt={rp.title} className="rp-img" />
                  <span className="rp-badge">{rp.category}</span>
                </div>
                <div className="rp-body">
                  <div className="rp-meta">{rp.date} • {rp.read}</div>
                  <h3 className="rp-title">
                    <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                  </h3>
                  <p className="rp-excerpt">{rp.excerpt}</p>
                  <Link href={`/blog/${rp.slug}`} className="rp-link">
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

