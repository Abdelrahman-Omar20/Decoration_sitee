import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'; // Security

import { initializeDatabase } from './infrastructure/database/connection';
import { userRepository } from './infrastructure/database/UserRepository';
import { categoryRepository } from './infrastructure/database/CategoryRepository';
import { serviceRepository } from './infrastructure/database/ServiceRepository';
import { videoRepository } from './infrastructure/database/VideoRepository';

// Routes
import authRoutes from './api/routes/auth';
import videoRoutes from './api/routes/videos';
import categoryRoutes from './api/routes/categories';
import contactRoutes from './api/routes/contact';
import serviceRoutes from './api/routes/services';

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images to be loaded
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter); // Apply to API routes

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize database and seed data
async function initialize() {
    console.log('Initializing database...');
    initializeDatabase();

    // Create default admin user if not exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elegancedecor.com';
    const existingAdmin = userRepository.findByEmail(adminEmail);

    if (!existingAdmin) {
        console.log('Creating default admin user...');
        await userRepository.create({
            email: adminEmail,
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin',
        });
        console.log(`Admin user created: ${adminEmail}`);
    }

    // Seed default categories if empty
    const categories = categoryRepository.findAll();
    if (categories.length === 0) {
        console.log('Seeding default categories...');
        const defaultCategories = [
            { name: 'Wedding', nameAr: 'أعراس' },
            { name: 'Party', nameAr: 'حفلات' },
            { name: 'Home Decor', nameAr: 'ديكور منزلي' },
            { name: 'Corporate', nameAr: 'فعاليات مؤسسية' },
            { name: 'Floral', nameAr: 'تنسيق زهور' }
        ];
        for (const cat of defaultCategories) {
            categoryRepository.create(cat);
        }
        console.log('Default categories created');
    }

    // Seed default services if empty
    const services = serviceRepository.findAll();
    if (services.length === 0) {
        console.log('Seeding default services...');
        const defaultServices = [
            { 
                title: 'Wedding Decoration', 
                titleAr: 'تنسيق الأعراس',
                description: 'Create your dream wedding with our bespoke styling services.', 
                descriptionAr: 'ابتكر عرس أحلامك مع خدمات التنسيق المخصصة لدينا.',
                icon: '💒', 
                sortOrder: 1 
            },
            { 
                title: 'Party Styling', 
                titleAr: 'تنسيق الحفلات',
                description: 'Birthdays, anniversaries, and special celebrations.', 
                descriptionAr: 'أعياد الميلاد، الذكرى السنوية، والاحتفالات الخاصة.',
                icon: '🎉', 
                sortOrder: 2 
            },
            { 
                title: 'Home Decor', 
                titleAr: 'ديكور المنزل',
                description: 'Transform your living spaces with elegant touches.', 
                descriptionAr: 'حول مساحات المعيشة الخاصة بك بلمسات أنيقة.',
                icon: '🏠', 
                sortOrder: 3 
            },
            { 
                title: 'Corporate Events', 
                titleAr: 'فعاليات الشركات',
                description: 'Professional event styling for businesses.', 
                descriptionAr: 'تنسيق فعاليات احترافي للشركات والأعمال.',
                icon: '🏢', 
                sortOrder: 4 
            },
            { 
                title: 'Floral Design', 
                titleAr: 'تصميم الزهور',
                description: 'Exquisite floral arrangements for any occasion.', 
                descriptionAr: 'تنسيقات زهور رائعة لكل مناسبة.',
                icon: '🌸', 
                sortOrder: 5 
            },
        ];
        for (const svc of defaultServices) {
            serviceRepository.create(svc);
        }
        console.log('Default services created');
    }

    // Seed default videos if empty
    const videos = videoRepository.findAll();
    if (videos.length === 0) {
        console.log('Seeding default videos...');
        const cats = categoryRepository.findAll();
        const getCatId = (name: string) => cats.find(c => c.name.includes(name))?.id;

        const seedVideos = [
            {
                title: "Luxurious Royal Wedding Setup",
                titleAr: "تنسيق عرس ملكي فاخر",
                description: "A breathtaking wedding stage designed with white roses, gold accents, and crystal chandeliers.",
                descriptionAr: "منصة عرس مذهلة مصممة بالورود البيضاء، واللمسات الذهبية، والثريات الكريستالية.",
                videoUrl: "https://www.youtube.com/embed/SAbXhOnIitM", // Real YouTube embed example
                thumbnailUrl: "https://img.youtube.com/vi/SAbXhOnIitM/maxresdefault.jpg",
                categoryId: getCatId('Wedding'),
                isFeatured: true
            },
            {
                title: "Elegant Garden Birthday",
                titleAr: "عيد ميلاد في حديقة أنيقة",
                description: "Vibrant and colorful floral setup for an outdoor afternoon celebration.",
                descriptionAr: "تنسيق زهور نابض بالألوان لاحتفال في الهواء الطلق.",
                videoUrl: "https://www.youtube.com/embed/zM7vUoP_nTM",
                thumbnailUrl: "https://img.youtube.com/vi/zM7vUoP_nTM/maxresdefault.jpg",
                categoryId: getCatId('Party'),
                isFeatured: true
            },
            {
                title: "Modern Office Transformation",
                titleAr: "تحويل مكتب عصري",
                description: "Sleek and professional decor for a corporate networking event.",
                descriptionAr: "ديكور أنيق واحترافي لفعالية تواصل مؤسسية.",
                videoUrl: "https://www.youtube.com/embed/y86hO27yRto",
                thumbnailUrl: "https://img.youtube.com/vi/y86hO27yRto/maxresdefault.jpg",
                categoryId: getCatId('Corporate'),
                isFeatured: true
            }
        ];

        for (const v of seedVideos) {
            videoRepository.create(v);
        }
        console.log('Default videos created');
    }
}

// Start server
initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`API available at http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize:', error);
        process.exit(1);
    });
