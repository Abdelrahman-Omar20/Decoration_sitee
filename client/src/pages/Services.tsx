import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Heart, Home, Building2, Flower2, PartyPopper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Services.css';
import SEO from '@/components/SEO';

interface Service {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
}

const iconMap: Record<string, any> = {
    'Heart': Heart,
    'PartyPopper': PartyPopper,
    'Home': Home,
    'Building2': Building2,
    'Flower2': Flower2,
    'Sparkles': Sparkles,
};

export default function Services() {
    const { t, i18n } = useTranslation();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getIcon = (iconName: string) => {
        // Current icons are emojis in database.json, but some might be names.
        // If it's a name from our map, use it. Otherwise return a default or the emoji itself.
        if (iconMap[iconName]) {
            const IconComponent = iconMap[iconName];
            return <IconComponent size={28} />;
        }
        return <span style={{ fontSize: '24px' }}>{iconName || '✨'}</span>;
    };

    return (
        <div className="services-page">
            <SEO
                title={t('header.services')}
                description={t('sections.services.subtitle')}
            />
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>{t('sections.services.title')}</h1>
                    <div className="accent-line"></div>
                    <p>{t('sections.services.subtitle')}</p>
                </div>
            </section>

            {/* Services List */}
            <section className="services-list-section">
                <div className="container">
                    {loading ? (
                        <div className="skeleton-container">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="service-row-skeleton skeleton" style={{ height: '300px', marginBottom: '2rem' }}></div>
                            ))}
                        </div>
                    ) : (
                        services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`service-row ${index % 2 === 1 ? 'service-row-reverse' : ''}`}
                            >
                                <div className="service-image">
                                    <div className="image-placeholder skeleton"></div>
                                    <div className="service-icon-badge">
                                        {getIcon(service.icon)}
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h2>{i18n.language === 'ar' ? service.titleAr : service.title}</h2>
                                    <p>{i18n.language === 'ar' ? service.descriptionAr : service.description}</p>
                                    <a href="/contact" className="btn btn-primary">
                                        {t('sections.cta.button')}
                                        <ChevronRight size={18} />
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section section">
                <div className="container">
                    <div className="section-title">
                        <h2>{i18n.language === 'ar' ? 'عملنا' : 'Our Process'}</h2>
                        <div className="accent-line"></div>
                        <p>{i18n.language === 'ar' ? 'كيف نحقق رؤيتك على أرض الواقع' : 'How we bring your vision to life'}</p>
                    </div>

                    <div className="process-steps">
                        {[
                            { step: '01', title: i18n.language === 'ar' ? 'الاستشارة' : 'Consultation', desc: i18n.language === 'ar' ? 'نناقش رؤيتك وتفضيلاتك وتفاصيل الفعالية' : 'We discuss your vision, preferences, and event details' },
                            { step: '02', title: i18n.language === 'ar' ? 'التصميم' : 'Design', desc: i18n.language === 'ar' ? 'يقوم فريقنا بإنشاء مفهوم مخصص ولوحة أفكار' : 'Our team creates a custom concept and mood board' },
                            { step: '03', title: i18n.language === 'ar' ? 'التخطيط' : 'Planning', desc: i18n.language === 'ar' ? 'ننهي التفاصيل ونوفر المواد ونستعد' : 'We finalize details, source materials, and prepare' },
                            { step: '04', title: i18n.language === 'ar' ? 'التنفيذ' : 'Execution', desc: i18n.language === 'ar' ? 'نقوم بإعداد وتنسيق مساحتك بشكل مثالي' : 'We set up and style your space to perfection' },
                        ].map((item, i) => (
                            <div key={i} className="process-step">
                                <span className="step-number">{item.step}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
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
