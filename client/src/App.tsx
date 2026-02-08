import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardHome from './pages/admin/DashboardHome';
import VideoManagement from './pages/admin/VideoManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ServiceManagement from './pages/admin/ServiceManagement';
import MessageManagement from './pages/admin/MessageManagement';
import Settings from './pages/admin/Settings';

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="services" element={<Services />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="blog" element={<Blog />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="videos" element={<VideoManagement />} />
                    <Route path="categories" element={<CategoryManagement />} />
                    <Route path="services" element={<ServiceManagement />} />
                    <Route path="messages" element={<MessageManagement />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
