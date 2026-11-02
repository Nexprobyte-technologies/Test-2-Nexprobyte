'use client';

import React, { useState } from 'react';

const POSTS = [
  {
    slug: 'why-every-business-needs-a-website-in-2026',
    title: 'Why Every Business Still Needs a Website in 2026',
    category: 'Web',
    date: 'Aug 18, 2026',
    read: '5 min',
    excerpt: 'Social media borrows your audience; a website owns it. Here\'s why your own corner of the internet still matters more than ever.',
    image: '/images/cover-web.jpg',
    content: [
      { h: 'The audience you rent vs the one you own' },
      { p: 'Social platforms are powerful — but they can change their algorithm, their pricing or their rules overnight. A website is the one place where you control the experience, the content and the relationship. It\'s the home base every other channel points back to.' },
      { h: 'Credibility is decided in 5 seconds' },
      { p: 'Before a customer buys, they check. A fast, clean and professional website tells them you\'re a serious business. In 2026 that first impression still happens on a company\'s own domain more than anywhere else.' },
      { h: 'It compounds, everything else doesn\'t' },
      { p: 'Every blog post, product page and service explainer you publish becomes an asset that keeps working — appearing in search results, answering questions and closing sales while you sleep. That\'s leverage social posts rarely give you.' },
      { h: 'Digital marketing starts at your domain' },
      { p: 'Whether you run Google Ads, post on social media or publish content, every digital marketing channel should land on a page you own. A fast-loading website built for conversion is the foundation every Coimbatore business needs before scaling marketing spend.' },
    ],
  },
  {
    slug: 'seo-basics-that-actually-move-the-needle',
    title: 'SEO Basics That Actually Move the Needle',
    category: 'SEO',
    date: 'Jul 30, 2026',
    read: '6 min',
    excerpt: 'Skip the gimmicks. These practical, on-page fundamentals consistently improve rankings for small and mid-size businesses.',
    image: '/images/cover-seo.jpg',
    content: [
      { h: 'Start with the search behind the click' },
      { p: 'People don\'t search for you, they search for a solution. Find the phrases your customers type when they have a problem you solve — and build content around exactly those phrases, not vague keywords.' },
      { h: 'Speed is a ranking factor and a conversion factor' },
      { p: 'Google punishes slow sites and so do users. Compress images, minimise scripts and move to fast hosting. A one-second improvement in load time can lift both rankings and conversions.' },
      { h: 'Backlinks still decide who wins' },
      { p: 'On-page SEO gets you in the game; backlinks win it. A focused backlink building strategy — earning links from authentic, relevant websites — remains one of the strongest ranking signals Google uses. Quality beats quantity.' },
      { h: 'Consistency compounds' },
      { p: 'SEO is not a one-month project. Publish useful content monthly, keep technical health in check, and give it time. For startups and SMEs in Coimbatore, a local SEO strategy combined with steady content publishing tends to outperform expensive one-off campaigns.' },
    ],
  },
  {
    slug: 'mobile-first-design-is-not-optional',
    title: 'Mobile-First Design Is Not Optional',
    category: 'Design',
    date: 'Jul 12, 2026',
    read: '4 min',
    excerpt: 'More than 70% of web traffic now comes from phones. Design for the small screen first and the large screen will thank you.',
    image: '/images/cover-design.jpg',
    content: [
      { h: 'Small screen, big decisions' },
      { p: 'When you design for mobile first, you\'re forced to make decisions about what\'s truly important. That clarity carries over to the desktop experience — stripping away the noise before it ever gets added back.' },
      { h: 'Thumb-friendly interactions' },
      { p: 'Buttons should sit where thumbs naturally reach, tap targets need to be generously sized, and forms should ask for the least possible input. The friction you remove on mobile is friction you remove everywhere.' },
      { h: 'Performance is part of the design' },
      { p: 'A beautiful layout that loads slowly feels broken on a phone. Optimise images, defer heavy scripts and test on real devices, not just desktop browsers.' },
    ],
  },
  {
    slug: 'social-media-strategy-for-smes',
    title: 'A Realistic Social Media Strategy for SMEs',
    category: 'Marketing',
    date: 'Jun 21, 2026',
    read: '7 min',
    excerpt: 'Posting more isn\'t the strategy. Here\'s a simple, sustainable system for small teams to build a brand people actually follow.',
    image: '/images/cover-marketing.jpg',
    content: [
      { h: 'Pick two platforms, not six' },
      { p: 'Small teams can\'t be everywhere. Choose the one or two platforms where your customers actually spend time, commit to them, and go deep instead of spreading thin. Most SMEs in Coimbatore see the strongest returns from a mix of Instagram and LinkedIn.' },
      { h: 'Content that serves, not just sells' },
      { p: 'Strike a balance: teach something useful, share behind-the-scenes moments, and occasionally ask for the sale. The ratio that works for most SMEs is roughly 4:1 — four value posts for every promotional one.' },
      { h: 'Batching beats burnout' },
      { p: 'Set aside one morning a month to create 8–10 pieces of content. Batch creation removes the daily anxiety and gives you a consistent presence without the daily scramble.' },
      { h: 'Measure the right things' },
      { p: 'Likes are vanity; conversations and booked enquiries are what matter. Watch what content leads to messages and calls, then make more of that.' },
    ],
  },
  {
    slug: 'what-is-a-digital-agency-and-how-to-choose-one',
    title: 'What Is a Digital Agency (and How to Choose One)',
    category: 'Business',
    date: 'May 29, 2026',
    read: '6 min',
    excerpt: 'Before you hire an agency, you should know what to look for — and what to avoid. A practical guide for first-time buyers.',
    image: '/images/cover-business.jpg',
    content: [
      { h: 'What an agency actually does' },
      { p: 'A digital agency is a team that handles the parts of your business you don\'t have skills or time for — building websites, apps, marketing and design as one coordinated unit rather than disconnected freelancers.' },
      { h: 'Look for process, not promises' },
      { p: 'Avoid agencies that guarantee "number one on Google" or "10x sales overnight". The good ones talk about process: research, build, test, measure, improve. That\'s the language of people who deliver.' },
      { h: 'Ask who you\'ll actually speak to' },
      { p: 'Will you interact with the people doing the work, or a salesperson who disappears after the contract is signed? Clear, direct communication is the single best predictor of a good project.' },
      { h: 'Local context matters for digital marketing agencies' },
      { p: 'For businesses in India, an agency that understands local search behaviour is a major advantage. A digital marketing agency in Coimbatore that knows how local businesses rank will usually beat a generic firm on cost and results.' },
    ],
  },
  {
    slug: 'web-performance-is-a-business-metric',
    title: 'Web Performance Is a Business Metric',
    category: 'Web',
    date: 'May 05, 2026',
    read: '5 min',
    excerpt: 'Every second of load time is revenue leaking out the door. Why speed should be a board-room topic, not just a developer concern.',
    image: '/images/cover-speed.jpg',
    content: [
      { h: 'The seconds have a price tag' },
      { p: 'Studies consistently show that conversion rates drop sharply as load time increases — often several percent per second. For a business doing meaningful traffic, that translates into real, countable revenue.' },
      { h: 'Speed shapes perception' },
      { p: 'Users can\'t articulate why, but a slow site makes a brand feel outdated and untrustworthy. Speed is a branding decision wearing technical clothes.' },
      { h: 'Where to start' },
      { p: 'Measure first. Use tools like Google PageSpeed Insights and real-user monitoring to identify the biggest offenders, then fix images, caching and server response times in that order.' },
    ],
  },
];

export default function BlogInsights() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Thought Leadership • Technical Guides</div>
          <h2 className="section-title">
            Digital Engineering <span className="gradient-text">&amp; Growth Insights</span>
          </h2>
          <p className="section-subtitle">
            Field-tested insights on SEO, web performance, scalable software architecture, and modern growth marketing from the Nexprobyte engineering hub.
          </p>
        </div>

        <div className="blog-grid stagger-group">
          {POSTS.map((post, idx) => (
            <article
              key={idx}
              className="blog-card spotlight-card reveal-up"
              onClick={() => setSelectedPost(post)}
            >
              <div className="blog-card-img-wrap">
                <img src={post.image} alt={post.title} className="blog-cover-img" />
                <span className="blog-cat-badge">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-meta-row">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.read} read</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-read-more">
                  <span>Read full guide &rarr;</span>
                </div>
              </div>
            </article>
          ))}
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
                  {selectedPost.content.map((item, cIdx) => (
                    <div key={cIdx} className="article-block">
                      {item.h && <h4 className="article-heading">{item.h}</h4>}
                      {item.p && <p className="article-para">{item.p}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <a href="#contact" className="btn-primary-hero" onClick={() => setSelectedPost(null)}>
                  Discuss This Strategy With Our Team &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
