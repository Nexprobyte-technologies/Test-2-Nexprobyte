'use client';

import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function InterviewDataPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    address: '',
    experienceType: 'Fresher',
    experienceYears: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      errs.name = 'Full Name must be at least 2 characters.';
    }
    if (!formData.dob) {
      errs.dob = 'Date of Birth is required.';
    } else {
      const selected = new Date(formData.dob);
      if (selected > new Date()) {
        errs.dob = 'Date of Birth cannot be in the future.';
      }
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Please enter your full address.';
    }
    if (formData.experienceType === 'Experienced' && !formData.experienceYears) {
      errs.experienceYears = 'Please specify total years of experience.';
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

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Candidate Interview Data' }]} />
      </div>

      <PageHero
        num="HR Portal"
        label="Candidate Onboarding"
        title={['Interview Data', 'Collection']}
        sub="Please provide your authenticated profile details prior to your technical interview rounds with the Nexprobyte Coimbatore team."
      />

      <section className="section wrap" style={{ paddingTop: '30px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {isSubmitted ? (
            <div className="application-success-card spotlight-card reveal-up">
              <div className="success-icon-badge">✓</div>
              <h3 className="success-heading">Candidate Dossier Recorded</h3>
              <p className="success-message">
                Thank you, <b>{formData.name}</b>. Your interview background profile has been submitted to the Nexprobyte Talent Committee.
              </p>
              <p className="success-sub">
                Our HR coordinator will verify your documents and send you the Google Meet link / studio schedule at <b>{formData.email}</b>.
              </p>
              <button
                type="button"
                className="btn-primary-hero"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    dob: '',
                    email: '',
                    address: '',
                    experienceType: 'Fresher',
                    experienceYears: '',
                  });
                  setResumeFile(null);
                  setResumeName('');
                }}
                style={{ marginTop: '20px' }}
              >
                Submit Additional Documents
              </button>
            </div>
          ) : (
            <form className="application-form spotlight-card reveal-up" onSubmit={handleSubmit}>
              <div className="form-header">
                <span className="badge-tag">OFFICIAL INTAKE</span>
                <h2 className="form-title">Candidate Details Form</h2>
                <p className="form-sub">
                  Required for all technical and managerial interview rounds at Nexprobyte Technologies.
                </p>
              </div>

              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group col-half">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Candidate Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                {/* DOB */}
                <div className="form-group col-half">
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    className={`form-input ${errors.dob ? 'is-invalid' : ''}`}
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                  {errors.dob && <span className="field-error-msg">{errors.dob}</span>}
                </div>

                {/* Email */}
                <div className="form-group full-width">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="candidate@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>

                {/* Full Address */}
                <div className="form-group full-width">
                  <label className="form-label">Current Residential Address *</label>
                  <textarea
                    className={`form-textarea ${errors.address ? 'is-invalid' : ''}`}
                    rows="3"
                    placeholder="Door no, Street, City, State, Pincode"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  {errors.address && <span className="field-error-msg">{errors.address}</span>}
                </div>

                {/* Experience Type */}
                <div className="form-group col-half">
                  <label className="form-label">Candidate Category *</label>
                  <select
                    className="form-select"
                    value={formData.experienceType}
                    onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                  >
                    <option value="Fresher">Fresher / Recent Graduate</option>
                    <option value="Experienced">Experienced Professional</option>
                  </select>
                </div>

                {/* Experience Years */}
                {formData.experienceType === 'Experienced' && (
                  <div className="form-group col-half">
                    <label className="form-label">Total Years of Experience *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.experienceYears ? 'is-invalid' : ''}`}
                      placeholder="e.g. 2.5 Years"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    />
                    {errors.experienceYears && <span className="field-error-msg">{errors.experienceYears}</span>}
                  </div>
                )}

                {/* Resume Upload */}
                <div className="form-group full-width">
                  <label className="form-label">Upload Resume (PDF Only, Max 5MB) *</label>
                  <div className="file-upload-box">
                    <input
                      type="file"
                      id="interview-resume-file"
                      accept=".pdf,application/pdf"
                      className="file-input-hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="interview-resume-file" className="file-upload-trigger">
                      <span className="upload-icon">📄</span>
                      {resumeName ? (
                        <span className="upload-name-active">{resumeName}</span>
                      ) : (
                        <span className="upload-placeholder">Click to select and upload your resume PDF</span>
                      )}
                    </label>
                  </div>
                  {errors.resume && <span className="field-error-msg">{errors.resume}</span>}
                </div>
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn-primary-hero submit-app-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Recording Profile Data...' : 'Submit Candidate Dossier &rarr;'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

