import { useState, useEffect } from 'react';
import { Trash2, FolderOpen, Plus, X } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    nameAr: string;
}

export default function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nameAr: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowModal(false);
                setFormData({ name: '', nameAr: '' });
                fetchCategories();
            }
        } catch (error) {
            console.error('Add category failed:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure? This may affect videos in this category.')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchCategories();
        } catch (error) {
            console.error('Delete category failed:', error);
        }
    };

    return (
        <div className="admin-page">
            <header className="page-header">
                <div>
                    <h2>Categories</h2>
                    <p>Manage video categories</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Add Category
                </button>
            </header>

            <div className="content-card">
                {loading ? (
                    <div className="loading-state">Loading...</div>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name (EN / AR)</th>
                                    <th>ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat.id}>
                                        <td>
                                            <div className="flex-center">
                                                <FolderOpen size={18} className="mr-2 text-muted" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <strong>{cat.name}</strong>
                                                    <span className="text-ar">{cat.nameAr}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td><code className="code-id">{cat.id}</code></td>
                                        <td>
                                            <button className="btn-icon text-danger" onClick={() => handleDelete(cat.id)}>
                                                <Trash2 size={18} />
                                            </button>
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
                            <h3>Add Category</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>English Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Arabic Name *</label>
                                <input
                                    type="text"
                                    value={formData.nameAr}
                                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                    dir="rtl"
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
