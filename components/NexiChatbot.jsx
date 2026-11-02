'use client';

import React, { useState, useRef, useEffect } from 'react';
import { COMPANY_INFO } from '@/data/siteContent';

export default function NexiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'nexi',
      text: "Hi there! I'm Nexi, your Nexprobyte AI assistant. Great to meet you. What's your name?",
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [userNeed, setUserNeed] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    setTimeout(() => {
      processBotResponse(text);
    }, 600);
  };

  const processBotResponse = (text) => {
    const lower = text.toLowerCase();
    let reply = '';
    let nextStep = step;

    if (step === 1) {
      let extractedName = text;
      const match = lower.match(/(?:my name is|i am|i'm|this is)\s+([a-zA-Z]+)/);
      if (match) extractedName = match[1];
      else extractedName = text.split(/\s+/)[0];

      if (['hi', 'hello', 'hey', 'am', "i'm"].includes(extractedName.toLowerCase())) {
        extractedName = 'friend';
      }

      setUserName(extractedName);
      reply = `Nice to meet you, ${extractedName}! We build high-converting websites, mobile apps, ERP systems, and AI automation. Are you looking for our Products (like GO Drive) or our Services?`;
      nextStep = 2;
    } else if (lower.includes('product') || lower.includes('go drive') || lower.includes('drive')) {
      setUserNeed('GO Drive / Products');
      reply =
        'Our flagship product is GO Drive — simple, ultra-fast cloud storage made for everyday business use across Android, iOS and Web. Would you like me to connect you with our solutions architect on WhatsApp?';
      nextStep = 3;
    } else if (
      lower.includes('service') ||
      lower.includes('web') ||
      lower.includes('app') ||
      lower.includes('seo') ||
      lower.includes('marketing') ||
      lower.includes('ai') ||
      lower.includes('software')
    ) {
      setUserNeed(text);
      reply =
        'We offer Full-Stack Web & App Development, Technical SEO, Social Media Marketing, UI/UX Design, and Custom AI Agents. We can have our team in Coimbatore prepare a customized proposal for you!';
      nextStep = 3;
    } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('rate')) {
      reply =
        'Our project packages start from ₹18,999 for Essential Launch, ₹38,999 for Growth Pro, and custom scopes for Enterprise apps. Retainers start at $1,299/mo.';
    } else {
      reply =
        "Thank you! Would you like to chat directly with our senior engineering team on WhatsApp? Click the WhatsApp link below or call us at +91 95000 42426.";
    }

    setStep(nextStep);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'nexi',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const getWhatsAppUrl = () => {
    const lines = [
      'Hi Nexprobyte Team! I just chatted with Nexi on your website.',
      userName ? `Name: ${userName}` : '',
      userNeed ? `Inquiry: ${userNeed}` : '',
      'Please get back to me with details.',
    ].filter(Boolean);

    return `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <>
      {/* Floating Launcher FAB */}
      <div className="nexi-fab-container" id="nexi-fab-root">
        {!isOpen && (
          <button
            type="button"
            className="nexi-fab-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open Nexi AI Assistant"
          >
            <span className="nexi-avatar-sparkle">✦</span>
            <div className="nexi-fab-pulse" />
            <span className="nexi-fab-label">Chat with Nexi</span>
          </button>
        )}

        {/* Chatbot Window */}
        {isOpen && (
          <div className="nexi-window" role="dialog" aria-label="Nexi AI Assistant">
            <div className="nexi-header">
              <div className="nexi-header-info">
                <div className="nexi-avatar">
                  <span>✦</span>
                  <span className="nexi-online-dot" />
                </div>
                <div>
                  <h3 className="nexi-title">Nexi • Nexprobyte AI</h3>
                  <span className="nexi-subtitle">Online • Studio Coimbatore</span>
                </div>
              </div>
              <button
                type="button"
                className="nexi-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Nexi Chat"
              >
                ✕
              </button>
            </div>

            <div className="nexi-messages">
              {messages.map((m) => (
                <div key={m.id} className={`nexi-message-row ${m.sender === 'user' ? 'is-user' : 'is-bot'}`}>
                  {m.sender === 'nexi' && <div className="nexi-msg-avatar">✦</div>}
                  <div className="nexi-bubble">
                    <p>{m.text}</p>
                    <span className="nexi-time">{m.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="nexi-chips-bar">
              <button
                type="button"
                className="nexi-chip"
                onClick={() => handleSend('Tell me about your Services')}
              >
                💼 Services
              </button>
              <button
                type="button"
                className="nexi-chip"
                onClick={() => handleSend('Tell me about GO Drive')}
              >
                🚀 GO Drive
              </button>
              <button
                type="button"
                className="nexi-chip"
                onClick={() => handleSend('What are your Pricing packages?')}
              >
                ₹ Pricing
              </button>
            </div>

            {/* WhatsApp Direct Dispatch Action */}
            <div className="nexi-wa-cta">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="nexi-wa-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.83a8.17 8.17 0 0 1-5.82 2.41c-1.48 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m4.52 11.64c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.65.81-.8 1-.15.18-.3.2-.55.08-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.24.26-.4.08-.17.04-.32-.02-.45-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7 2.46 1.07 2.46.71 2.9.67.44-.05 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28" />
                </svg>
                Continue on WhatsApp ({COMPANY_INFO.phone})
              </a>
            </div>

            <form
              className="nexi-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Ask Nexi about services, tech stacks..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="nexi-input"
              />
              <button type="submit" className="nexi-send-btn" aria-label="Send message">
                ➤
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

