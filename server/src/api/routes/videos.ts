import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { videoRepository } from '../../infrastructure/database/VideoRepository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Configure multer for video uploads
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subDir = file.fieldname === 'video' ? 'videos' : 'thumbnails';
        const fullPath = path.join(uploadDir, subDir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '209715200'), // 200MB default
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video') {
            if (file.mimetype.startsWith('video/')) {
                cb(null, true);
            } else {
                cb(new Error('Only video files allowed'));
            }
        } else if (file.fieldname === 'thumbnail') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files allowed'));
            }
        } else {
            cb(null, true);
        }
    },
});

// Get all videos (public)
router.get('/', (req, res) => {
    try {
        const { categoryId, featured, limit } = req.query;
        const videos = videoRepository.findAll({
            categoryId: categoryId as string,
            isFeatured: featured === 'true' ? true : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
        });
        res.json(videos);
    } catch (error) {
        console.error('Get videos error:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Get single video (public)
router.get('/:id', (req, res) => {
    try {
        const video = videoRepository.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json(video);
    } catch (error) {
        console.error('Get video error:', error);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

// Upload video (admin only)
router.post('/', authMiddleware, upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
]), (req, res) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files.video || files.video.length === 0) {
            return res.status(400).json({ error: 'Video file required' });
        }

        const videoFile = files.video[0];
        const thumbnailFile = files.thumbnail?.[0];

        const video = videoRepository.create({
            title: req.body.title || 'Untitled',
            titleAr: req.body.titleAr || 'بدون عنوان',
            description: req.body.description || '',
            descriptionAr: req.body.descriptionAr || '',
            videoUrl: `/uploads/videos/${videoFile.filename}`,
            thumbnailUrl: thumbnailFile ? `/uploads/thumbnails/${thumbnailFile.filename}` : undefined,
            categoryId: req.body.categoryId,
            isFeatured: req.body.isFeatured === 'true',
            duration: req.body.duration,
        });

        res.status(201).json(video);
    } catch (error) {
        console.error('Upload video error:', error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
});

// Update video (admin only)
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const video = videoRepository.update(req.params.id, req.body);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json(video);
    } catch (error) {
        console.error('Update video error:', error);
        res.status(500).json({ error: 'Failed to update video' });
    }
});

// Delete video (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const success = videoRepository.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

export default router;
