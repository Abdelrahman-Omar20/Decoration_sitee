import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <span className="logo-text">Elegance</span>
                            <span className="logo-accent">Décor</span>
                        </Link>
                        <p>
                            {t('footer.description')}
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram" className="social-link">
                                <Instagram size={20} />
                            </a>
                            <a href="#" aria-label="Facebook" className="social-link">
                                <Facebook size={20} />
                            </a>
                            <a href="#" aria-label="YouTube" className="social-link">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>{t('footer.quickLinks')}</h4>
                        <ul>
                            <li><Link to="/">{t('header.home')}</Link></li>
                            <li><Link to="/gallery">{t('header.gallery')}</Link></li>
                            <li><Link to="/services">{t('header.services')}</Link></li>
                            <li><Link to="/blog">{t('header.blog')}</Link></li>
                            <li><Link to="/contact" className="footer-link">{t('header.contact')}</Link></li>
                            <li><Link to="/admin" className="footer-link">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-links">
                        <h4>{t('footer.services')}</h4>
                        <ul>
                            <li><Link to="/services">{t('sections.services.title')}</Link></li>
                            {/* We can map services here or keep links generic if translations aren't dynamic enough yet */}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>{t('footer.contact')}</h4>
                        <ul>
                            <li>
                                <Phone size={16} />
                                <span>+1 (234) 567-8900</span>
                            </li>
                            <li>
                                <Mail size={16} />
                                <span>hello@elegancedecor.com</span>
                            </li>
                            <li>
                                <MapPin size={16} />
                                <span>123 Design Street, Creative City</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Elegance Décor. {t('footer.rights')}</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
