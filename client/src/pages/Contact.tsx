import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

export default function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>{t('contact.title')}</h1>
                    <div className="accent-line"></div>
                    <p>{t('contact.subtitle')}</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2>{t('contact.getInTouch')}</h2>
                            <p>
                                {t('contact.successDesc')}
                            </p>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="info-icon">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+1 (234) 567-8900</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>hello@elegancedecor.com</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4>Location</h4>
                                        <p>123 Design Street, Creative City</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4>Hours</h4>
                                        <p>Mon - Sat: 9AM - 6PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="map-placeholder skeleton"></div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            {isSubmitted ? (
                                <div className="success-message">
                                    <CheckCircle size={64} />
                                    <h3>{t('contact.form.success')}</h3>
                                    <p>{t('contact.form.successDesc')}</p>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                                        }}
                                    >
                                        {t('contact.form.sendAnother')}
                                    </button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <h2>{t('contact.title')}</h2>

                                    <div className="form-group">
                                        <label htmlFor="name">{t('contact.form.name')} *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="input"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="email">{t('contact.form.email')} *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="input"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">{t('contact.form.phone')}</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="input"
                                                placeholder="+1 (234) 567-8900"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="service">{t('contact.form.service')}</label>
                                        <select
                                            id="service"
                                            name="service"
                                            className="input"
                                            value={formData.service}
                                            onChange={handleChange}
                                        >
                                            <option value="">{t('contact.form.service')}</option>
                                            <option value="wedding">Wedding Decoration</option>
                                            <option value="party">Party Styling</option>
                                            <option value="home">Home Decor</option>
                                            <option value="corporate">Corporate Events</option>
                                            <option value="floral">Floral Design</option>
                                            <option value="custom">Custom Project</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">{t('contact.form.message')} *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="input textarea"
                                            placeholder="..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg submit-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                                        <Send size={18} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
