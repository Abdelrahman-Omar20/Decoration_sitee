import { useState, useEffect } from 'react';
import { Play, X, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VideoPlayer from '@/components/common/VideoPlayer';
import './Gallery.css';

interface Video {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    videoUrl: string;
    thumbnailUrl: string | null;
    category: string;
    categoryAr: string;
    duration: string | null;
}

export default function Gallery() {
    const { t, i18n } = useTranslation();
    const [videos, setVideos] = useState<Video[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [videosRes, categoriesRes] = await Promise.all([
                fetch('/api/videos'),
                fetch('/api/categories')
            ]);

            const videosData = await videosRes.json();
            const categoriesData = await categoriesRes.json();

            setVideos(videosData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to fetch gallery data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredVideos(videos);
        } else {
            setFilteredVideos(videos.filter(v => v.category === selectedCategory));
        }
    }, [selectedCategory, videos]);

    return (
        <div className="gallery-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>{t('header.gallery')}</h1>
                    <div className="accent-line"></div>
                    <p>{t('sections.featured.subtitle')}</p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="gallery-section">
                <div className="container">
                    <div className="filter-bar">
                        <div className="filter-scroll">
                            <button
                                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                {i18n.language === 'ar' ? 'الكل' : 'All'}
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {i18n.language === 'ar' ? category.nameAr : category.name}
                                </button>
                            ))}
                        </div>
                        <div className="filter-indicator">
                            <Filter size={20} />
                            <span>Filter</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="gallery-grid skeleton-grid">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="gallery-card skeleton"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="gallery-grid">
                                {filteredVideos.map((video) => (
                                    <div
                                        key={video.id}
                                        className="gallery-card"
                                        onClick={() => setSelectedVideo(video)}
                                    >
                                        <div className="thumbnail-wrapper">
                                            {video.thumbnailUrl ? (
                                                <img src={video.thumbnailUrl} alt={video.title} />
                                            ) : (
                                                <div className="video-placeholder"></div>
                                            )}
                                            <div className="overlay">
                                                <button className="play-btn">
                                                    <Play size={32} />
                                                </button>
                                            </div>
                                            <span className="duration">{video.duration || '0:00'}</span>
                                        </div>
                                        <div className="video-details">
                                            <span className="category-tag">{i18n.language === 'ar' ? video.categoryAr : video.category}</span>
                                            <h3>{i18n.language === 'ar' ? video.titleAr : video.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredVideos.length === 0 && (
                                <div className="no-results">
                                    <p>No videos found in this category.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="video-modal" onClick={() => setSelectedVideo(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedVideo(null)}>
                            <X size={24} />
                        </button>
                        <div className="modal-video">
                            <VideoPlayer
                                url={selectedVideo.videoUrl}
                                title={i18n.language === 'ar' ? selectedVideo.titleAr : selectedVideo.title}
                            />
                        </div>
                        <div className="modal-info">
                            <span className="video-category">
                                {i18n.language === 'ar' ? selectedVideo.categoryAr : selectedVideo.category}
                            </span>
                            <h2>{i18n.language === 'ar' ? selectedVideo.titleAr : selectedVideo.title}</h2>
                            <p>{i18n.language === 'ar' ? selectedVideo.descriptionAr : selectedVideo.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
