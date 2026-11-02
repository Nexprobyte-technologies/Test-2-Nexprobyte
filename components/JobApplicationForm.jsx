'use client';

import React, { useState } from 'react';
import { JOBS } from '@/data/siteContent';

export default function JobApplicationForm({ defaultJob = '' }) {
  const [formData, setFormData] = useState({
    jobTitle: defaultJob || (JOBS[0] ? JOBS[0].title : ''),
    name: '',
    email: '',
    phone: '',
    experience: '1 – 3 Years (Junior – Mid)',
    portfolioUrl: '',
    linkedinUrl: '',
    coverLetter: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const experienceOptions = [
    '0 – 1 Year (Entry Level / Fresher)',
    '1 – 3 Years (Junior – Mid)',
    '3 – 5 Years (Mid – Senior)',
    '5+ Years (Senior / Lead)',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrors((prev) => ({ ...prev, resume: 'Invalid file type. Please upload a PDF file (.pdf) only.' }));
      setResumeFile(null);
      setResumeName('');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: 'File size exceeds 5MB limit. Please upload a smaller PDF.' }));
      setResumeFile(null);
      setResumeName('');
      return;
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.resume;
      return copy;
    });

    setResumeFile(file);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    setResumeName(`${file.name} (${sizeMb} MB)`);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid contact phone number.';
    }
    if (!resumeFile) {
      errs.resume = 'Please upload your Resume/CV in PDF format.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="application-success-card spotlight-card">
        <div className="success-icon-badge">✓</div>
        <h3 className="success-heading">Application Received!</h3>
        <p className="success-message">
          Thank you, <b>{formData.name}</b>. Your application for <b>{formData.jobTitle}</b> has been registered in our Coimbatore engineering recruitment pipeline.
        </p>
        <p className="success-sub">
          Our technical hiring manager will review your profile and reach out via <b>{formData.email}</b> or WhatsApp within 48 business hours.
        </p>
        <button
          type="button"
          className="btn-primary-hero"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              jobTitle: defaultJob || (JOBS[0] ? JOBS[0].title : ''),
              name: '',
              email: '',
              phone: '',
              experience: '1 – 3 Years (Junior – Mid)',
              portfolioUrl: '',
              linkedinUrl: '',
              coverLetter: '',
            });
            setResumeFile(null);
            setResumeName('');
          }}
          style={{ marginTop: '20px' }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form className="application-form spotlight-card" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="badge-tag">DIRECT APPLICATION</span>
        <h2 className="form-title">Join Nexprobyte Engineering</h2>
        <p className="form-sub">
          Please provide accurate details. All applications are reviewed by human engineers, not automated keyword filters.
        </p>
      </div>

      <div className="form-grid">
        {/* Role Selector */}
        <div className="form-group full-width">
          <label className="form-label">Position Applying For *</label>
          <select
            className="form-select"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          >
            {JOBS.map((j) => (
              <option key={j.slug} value={j.title}>
                {j.title} ({j.dept} • {j.location})
              </option>
            ))}
            <option value="General Engineering Application">Other / General Technical Application</option>
          </select>
        </div>

        {/* Full Name */}
        <div className="form-group col-half">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className={`form-input ${errors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="field-error-msg">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group col-half">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'is-invalid' : ''}`}
            placeholder="you@domain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="field-error-msg">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="form-group col-half">
          <label className="form-label">Phone / WhatsApp Number *</label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
        </div>

        {/* Experience Dropdown */}
        <div className="form-group col-half">
          <label className="form-label">Relevant Experience Level *</label>
          <select
            className="form-select"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          >
            {experienceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Portfolio / GitHub URL */}
        <div className="form-group col-half">
          <label className="form-label">Portfolio / GitHub / Dribbble URL (Optional)</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://github.com/yourhandle"
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
          />
        </div>

        {/* LinkedIn URL */}
        <div className="form-group col-half">
          <label className="form-label">LinkedIn Profile URL (Optional)</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://linkedin.com/in/yourhandle"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
          />
        </div>

        {/* Resume Upload */}
        <div className="form-group full-width">
          <label className="form-label">Resume / CV (PDF Only, Max 5MB) *</label>
          <div className="file-upload-box">
            <input
              type="file"
              id="resume-file-input"
              accept=".pdf,application/pdf"
              className="file-input-hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="resume-file-input" className="file-upload-trigger">
              <span className="upload-icon">📄</span>
              {resumeName ? (
                <span className="upload-name-active">{resumeName}</span>
              ) : (
                <span className="upload-placeholder">Click to browse or upload your PDF resume</span>
              )}
            </label>
          </div>
          {errors.resume && <span className="field-error-msg">{errors.resume}</span>}
        </div>

        {/* Cover Letter */}
        <div className="form-group full-width">
          <label className="form-label">Cover Note / Tell Us About Yourself</label>
          <textarea
            className="form-textarea"
            rows="3"
            placeholder="Why are you interested in joining Nexprobyte? What projects are you most proud of?"
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          />
        </div>
      </div>

      <div className="form-submit-row">
        <button
          type="submit"
          className="btn-primary-hero submit-app-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying & Submitting...' : 'Submit Application Form &rarr;'}
        </button>
      </div>
    </form>
  );
}

