import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Video,
    FolderOpen,
    Briefcase,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import './AdminDashboard.css';

interface User {
    id: string;
    email: string;
    role: string;
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [stats, setStats] = useState({
        videos: 0,
        categories: 0,
        services: 0,
        messages: 0,
    });

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/admin/login');
            return;
        }

        setUser(JSON.parse(userData));
        fetchStats();
    }, [navigate]);

    const fetchStats = async () => {
        const token = localStorage.getItem('token');
        try {
            const [videos, categories, services, messages] = await Promise.all([
                fetch('/api/videos').then(r => r.json()),
                fetch('/api/categories').then(r => r.json()),
                fetch('/api/services').then(r => r.json()),
                fetch('/api/contact', {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(r => r.json()),
            ]);

            setStats({
                videos: videos.length || 0,
                categories: categories.length || 0,
                services: services.length || 0,
                messages: Array.isArray(messages) ? messages.length : 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/videos', icon: Video, label: 'Videos' },
        { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
        { path: '/admin/services', icon: Briefcase, label: 'Services' },
        { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    if (!user) return null;

    return (
        <div className="admin-layout">
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <span className="logo-text">Elegance</span>
                        <span className="logo-accent">Décor</span>
                    </Link>
                    <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="nav-item"
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">{user.email[0].toUpperCase()}</div>
                        <div className="user-details">
                            <span className="user-email">{user.email}</span>
                            <span className="user-role">{user.role}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <h1>Admin Dashboard</h1>
                </header>

                <div className="admin-content">
                    <Outlet context={{ stats, refreshStats: fetchStats }} />
                </div>
            </main>
        </div>
    );
}
