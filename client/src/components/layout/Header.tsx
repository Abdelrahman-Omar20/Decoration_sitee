import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import './Header.css';

const navLinks = [
    { path: '/', label: 'header.home' },
    { path: '/gallery', label: 'header.gallery' },
    { path: '/services', label: 'header.services' },
    { path: '/blog', label: 'header.blog' },
    { path: '/contact', label: 'header.contact' },
];

export default function Header() {
    const { t } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">
                        <span className="logo-text">Elegance</span>
                        <span className="logo-accent">Décor</span>
                    </Link>

                    <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-open' : ''}`}>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                                >
                                    {t(link.label)}
                                </Link>
                            </li>
                        ))}
                        <li className="mobile-only">
                            <LanguageSwitcher />
                        </li>
                    </ul>

                    <div className="header-actions">
                        <LanguageSwitcher />
                        <Link to="/contact" className="btn btn-primary header-cta">
                            {t('header.getQuote')}
                        </Link>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>
        </header>
    );
}
