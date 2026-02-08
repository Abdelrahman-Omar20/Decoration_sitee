import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

interface Service {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    sortOrder: number;
}

export default function ServiceManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        icon: '✨',
        sortOrder: 0
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
        const method = editingService ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingService(null);
                setFormData({ title: '', titleAr: '', description: '', descriptionAr: '', icon: '✨', sortOrder: 0 });
                fetchServices();
            }
        } catch (error) {
            console.error('Save service failed:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchServices();
        } catch (error) {
            console.error('Delete service failed:', error);
        }
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            titleAr: service.titleAr,
            description: service.description,
            descriptionAr: service.descriptionAr,
            icon: service.icon,
            sortOrder: service.sortOrder
        });
        setShowModal(true);
    };

    return (
        <div className="admin-page">
            <header className="page-header">
                <div>
                    <h2>Services</h2>
                    <p>Manage services offering</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingService(null); setShowModal(true); }}>
                    <Plus size={18} /> Add Service
                </button>
            </header>

            <div className="content-card">
                {loading ? (
                    <div className="loading-state">Loading services...</div>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Title (EN/AR)</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((svc) => (
                                    <tr key={svc.id}>
                                        <td>
                                            <div className="service-info-cell">
                                                <div className="flex-center font-medium">
                                                    <span className="mr-2">{svc.icon}</span>
                                                    {svc.title}
                                                </div>
                                                <span className="text-ar">{svc.titleAr}</span>
                                            </div>
                                        </td>
                                        <td className="truncate-cell" title={svc.description}>
                                            <div>{svc.description.substring(0, 50)}...</div>
                                            <div className="text-ar">{svc.descriptionAr.substring(0, 50)}...</div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" onClick={() => openEditModal(svc)}>
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className="btn-icon text-danger" onClick={() => handleDelete(svc.id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingService ? 'Edit Service' : 'Add Service'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sort Order</label>
                                    <input
                                        type="number"
                                        value={formData.sortOrder}
                                        onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                                    />
                                </div>
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
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingService ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
