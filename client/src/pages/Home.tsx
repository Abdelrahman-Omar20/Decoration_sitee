import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, ChevronRight, Star } from 'lucide-react';
import './Home.css';
import SEO from '@/components/SEO';


interface Video {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    videoUrl: string;
    thumbnailUrl: string | null;
    duration: string | null;
    category: string;
    categoryAr: string;
}

interface Service {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
}

export default function Home() {
    const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [videosRes, servicesRes] = await Promise.all([
                    fetch('/api/videos?featured=true&limit=6'),
                    fetch('/api/services')
                ]);

                const videosData = await videosRes.json();
                const servicesData = await servicesRes.json();

                setFeaturedVideos(videosData);
                setServices(servicesData);
            } catch (error) {
                console.error('Failed to fetch home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const { t, i18n } = useTranslation();

    return (
        <div className="home">
            <SEO
                title={t('header.home')}
                description={t('hero.subtitle')}
            />
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-video-bg">
                    <video autoPlay muted loop playsInline>
                        <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                </div>

                <div className="container hero-content">
                    <div className="hero-badge animate-fade-in">
                        <Star size={14} />
                        <span>{t('hero.badge')}</span>
                    </div>

                    <h1 className="hero-title animate-fade-in-up">
                        {t('hero.title1')}
                        <span className="text-gradient"> {t('hero.titleGradient')}</span>
                        <br />{t('hero.title2')}
                    </h1>

                    <p className="hero-subtitle animate-fade-in-up">
                        {t('hero.subtitle')}
                    </p>

                    <div className="hero-cta animate-fade-in-up">
                        <a href="/gallery" className="btn btn-primary btn-lg">
                            {t('hero.viewWork')}
                            <ChevronRight size={20} />
                        </a>
                        <button className="btn btn-secondary btn-lg hero-video-btn">
                            <Play size={20} />
                            {t('hero.watchShowreel')}
                        </button>
                    </div>

                    <div className="hero-stats animate-fade-in">
                        <div className="stat">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">{t('hero.stats.events')}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">12+</span>
                            <span className="stat-label">{t('hero.stats.experience')}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">{t('hero.stats.satisfaction')}</span>
                        </div>
                    </div>
                </div>

                <div className="hero-scroll-indicator">
                    <span>{t('hero.scroll')}</span>
                    <div className="scroll-line"></div>
                </div>
            </section>

            {/* Featured Videos Section */}
            <section className="section featured-videos">
                <div className="container">
                    <div className="section-title">
                        <h2>{t('sections.featured.title')}</h2>
                        <div className="accent-line"></div>
                        <p>{t('sections.featured.subtitle')}</p>
                    </div>

                    {loading ? (
                        <div className="video-grid">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="video-card card skeleton" style={{ height: '300px' }}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="video-grid">
                            {featuredVideos.length > 0 ? featuredVideos.map((video) => (
                                <div key={video.id} className="video-card card" onClick={() => window.location.href = '/gallery'}>
                                    <div className="video-thumbnail">
                                        {video.thumbnailUrl ? (
                                            <img src={video.thumbnailUrl} alt={video.title} />
                                        ) : (
                                            <div className="video-placeholder skeleton"></div>
                                        )}
                                        <div className="video-overlay">
                                            <button className="play-button">
                                                <Play size={24} />
                                            </button>
                                        </div>
                                        {video.duration && <span className="video-duration">{video.duration}</span>}
                                    </div>
                                    <div className="video-info">
                                        <span className="video-category">
                                            {i18n.language === 'ar' ? video.categoryAr : video.category}
                                        </span>
                                        <h3 className="video-title">{i18n.language === 'ar' ? video.titleAr : video.title}</h3>
                                        <p className="video-description">{i18n.language === 'ar' ? video.descriptionAr : video.description}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center col-span-3">No featured videos yet.</p>
                            )}
                        </div>
                    )}

                    <div className="section-cta">
                        <a href="/gallery" className="btn btn-primary btn-lg">
                            {t('sections.featured.viewAll')}
                            <ChevronRight size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="section services-preview">
                <div className="container">
                    <div className="section-title">
                        <h2>{t('sections.services.title')}</h2>
                        <div className="accent-line"></div>
                        <p>{t('sections.services.subtitle')}</p>
                    </div>

                    <div className="services-grid">
                        {loading ? (
                            [1, 2, 3, 4].map(i => (
                                <div key={i} className="service-card card-glass skeleton" style={{ height: '200px' }}></div>
                            ))
                        ) : (
                            services.slice(0, 4).map((service) => (
                                <div key={service.id} className="service-card card-glass">
                                    <span className="service-icon">{service.icon}</span>
                                    <h3>{i18n.language === 'ar' ? service.titleAr : service.title}</h3>
                                    <p>{i18n.language === 'ar' ? service.descriptionAr : service.description}</p>
                                    <a href="/services" className="service-link">
                                        {t('sections.services.learnMore')} <ChevronRight size={16} />
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Instagram Reels Section */}
            <section className="section instagram-section">
                <div className="container">
                    <div className="section-title">
                        <h2>{t('sections.instagram.title')}</h2>
                        <div className="accent-line"></div>
                        <p>{t('sections.instagram.subtitle')}</p>
                    </div>

                    <div className="reels-grid">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="reel-card">
                                <div className="reel-placeholder skeleton"></div>
                                <div className="reel-overlay">
                                    <Play size={32} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-cta">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-lg"
                        >
                            {t('sections.instagram.follow')}
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>{t('sections.cta.title')}</h2>
                        <p>{t('sections.cta.subtitle')}</p>
                        <a href="/contact" className="btn btn-primary btn-lg">
                            {t('sections.cta.button')}
                            <ChevronRight size={20} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
