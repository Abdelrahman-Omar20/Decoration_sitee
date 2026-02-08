import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Upload, Trash2, Play, X } from 'lucide-react';
import './VideoManagement.css';

interface Video {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    videoUrl: string;
    thumbnailUrl: string | null;
    categoryId: string | null;
    isFeatured: boolean;
    duration: string | null;
    createdAt: string;
}

interface Category {
    id: string;
    name: string;
}

interface DashboardContext {
    refreshStats: () => void;
}

export default function VideoManagement() {
    const { refreshStats } = useOutletContext<DashboardContext>();
    const [videos, setVideos] = useState<Video[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        categoryId: '',
        videoUrl: '', // New field for YouTube/Instagram URLs
        isFeatured: false,
    });
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    useEffect(() => {
        fetchVideos();
        fetchCategories();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await fetch('/api/videos');
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile && !formData.videoUrl) {
            alert('Please provide either a video file or a video URL');
            return;
        }

        setUploading(true);
        const token = localStorage.getItem('token');
        const form = new FormData();
        if (videoFile) form.append('video', videoFile);
        if (thumbnailFile) form.append('thumbnail', thumbnailFile);

        form.append('title', formData.title);
        form.append('titleAr', formData.titleAr);
        form.append('description', formData.description);
        form.append('descriptionAr', formData.descriptionAr);
        form.append('videoUrl', formData.videoUrl); // Will be ignored by backend if file provided, or used if no file
        if (formData.categoryId) form.append('categoryId', formData.categoryId);
        form.append('isFeatured', String(formData.isFeatured));

        try {
            const response = await fetch('/api/videos', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: form,
            });

            if (response.ok) {
                setShowUploadModal(false);
                setFormData({ title: '', titleAr: '', description: '', descriptionAr: '', categoryId: '', videoUrl: '', isFeatured: false });
                setVideoFile(null);
                setThumbnailFile(null);
                fetchVideos();
                refreshStats();
            } else {
                const error = await response.json();
                alert(`Upload failed: ${error.error}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please check the console for details.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this video?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/videos/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchVideos();
                refreshStats();
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const getCategoryName = (categoryId: string | null) => {
        if (!categoryId) return 'Uncategorized';
        const category = categories.find(c => c.id === categoryId);
        return category?.name || 'Unknown';
    };

    return (
        <div className="video-management">
            <div className="page-header">
                <h2>Video Management</h2>
                <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
                    <Plus size={20} />
                    <span>Add Video</span>
                </button>
            </div>

            <div className="videos-table">
                <table>
                    <thead>
                        <tr>
                            <th>Video</th>
                            <th>Title (EN/AR)</th>
                            <th>Category</th>
                            <th>Featured</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video.id}>
                                <td>
                                    <div className="video-thumb">
                                        {video.thumbnailUrl ? (
                                            <img src={video.thumbnailUrl} alt={video.title} />
                                        ) : (
                                            <div className="thumb-placeholder">
                                                <Play size={16} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="video-info-cell">
                                        <strong>{video.title}</strong>
                                        <span className="text-ar">{video.titleAr}</span>
                                    </div>
                                </td>
                                <td>{getCategoryName(video.categoryId)}</td>
                                <td>
                                    <span className={`badge ${video.isFeatured ? 'badge-featured' : ''}`}>
                                        {video.isFeatured ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td>{new Date(video.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="actions">
                                        <button className="action-btn delete" onClick={() => handleDelete(video.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {videos.length === 0 && (
                    <div className="empty-state">
                        <Upload size={48} />
                        <p>No videos yet. Add your first video!</p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add New Video</h3>
                            <button className="close-btn" onClick={() => setShowUploadModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUpload}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>English Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Arabic Title *</label>
                                    <input
                                        type="text"
                                        value={formData.titleAr}
                                        onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                        dir="rtl"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Video Source (Choose One) *</label>
                                <div className="source-options">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            setVideoFile(e.target.files?.[0] || null);
                                            if (e.target.files?.[0]) setFormData({ ...formData, videoUrl: '' });
                                        }}
                                        disabled={!!formData.videoUrl}
                                    />
                                    <div className="or-divider">OR</div>
                                    <input
                                        type="text"
                                        placeholder="YouTube/Instagram URL"
                                        value={formData.videoUrl}
                                        onChange={(e) => {
                                            setFormData({ ...formData, videoUrl: e.target.value });
                                            if (e.target.value) setVideoFile(null);
                                        }}
                                        disabled={!!videoFile}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Thumbnail (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                                />
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>English Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Arabic Description</label>
                                    <textarea
                                        value={formData.descriptionAr}
                                        onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                        rows={3}
                                        dir="rtl"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.isFeatured}
                                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    />
                                    Featured video
                                </label>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowUploadModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={uploading}>
                                    {uploading ? 'Processing...' : 'Save Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
