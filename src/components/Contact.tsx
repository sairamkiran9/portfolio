import { useState } from 'react';
import type { ContactFormData } from '../types';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setNotification({ message: 'Please fill in all fields.', type: 'error' });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification({ message: 'Please enter a valid email address.', type: 'error' });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setNotification({ message: "Thank you for your message! I'll get back to you soon.", type: 'success' });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Let's Build Something Amazing Together</h2>
          <p>Ready to scale your AI systems and drive business impact? Let's connect.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-item">
              <strong>Email:</strong> <a href="mailto:kiranmuppana36@gmail.com">kiranmuppana36@gmail.com</a>
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> <a href="tel:+18509434453">(850) 943-4453</a>
            </div>
            <div className="contact-item">
              <strong>Location:</strong> Tallahassee, FL
            </div>
            <div className="contact-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                LinkedIn Profile
              </a>
              <a href="https://github.com/sairamkiran9" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                GitHub Profile
              </a>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-control"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn--primary btn--full-width">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {notification && (
          <div
            className="fixed top-24 right-5 z-50 min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg"
            style={{
              background: notification.type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
              color: 'white',
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex-1">{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="text-white opacity-80 hover:opacity-100 text-xl bg-transparent border-0 cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
