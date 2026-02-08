import { useOutletContext } from 'react-router-dom';
import { Video, FolderOpen, Briefcase, MessageSquare } from 'lucide-react';
import './DashboardHome.css';

interface DashboardContext {
    stats: {
        videos: number;
        categories: number;
        services: number;
        messages: number;
    };
    refreshStats: () => void;
}

export default function DashboardHome() {
    const { stats } = useOutletContext<DashboardContext>();

    const statCards = [
        { label: 'Total Videos', value: stats.videos, icon: Video, color: '#C9A962' },
        { label: 'Categories', value: stats.categories, icon: FolderOpen, color: '#3B82F6' },
        { label: 'Services', value: stats.services, icon: Briefcase, color: '#10B981' },
        { label: 'Messages', value: stats.messages, icon: MessageSquare, color: '#F59E0B' },
    ];

    return (
        <div className="dashboard-home">
            <div className="stats-grid">
                {statCards.map((stat) => (
                    <div key={stat.label} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-sections">
                <div className="dashboard-section">
                    <h2>Quick Actions</h2>
                    <div className="quick-actions">
                        <a href="/admin/videos" className="action-card">
                            <Video size={24} />
                            <span>Upload Video</span>
                        </a>
                        <a href="/admin/categories" className="action-card">
                            <FolderOpen size={24} />
                            <span>Add Category</span>
                        </a>
                        <a href="/admin/services" className="action-card">
                            <Briefcase size={24} />
                            <span>Add Service</span>
                        </a>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Welcome!</h2>
                    <p className="welcome-text">
                        Welcome to the Elegance Décor admin panel. From here you can manage your videos,
                        categories, services, and view contact messages from potential clients.
                    </p>
                </div>
            </div>
        </div>
    );
}
