import { Router } from 'express';
import { categoryRepository } from '../../infrastructure/database/CategoryRepository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all categories (public)
router.get('/', (req, res) => {
    try {
        const categories = categoryRepository.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Create category (admin only)
router.post('/', authMiddleware, (req, res) => {
    try {
        const { name, nameAr, slug } = req.body;
        if (!name || !nameAr) {
            return res.status(400).json({ error: 'Name and NameAr required' });
        }
        const category = categoryRepository.create({ name, nameAr, slug });
        res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Delete category (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const success = categoryRepository.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

export default router;
