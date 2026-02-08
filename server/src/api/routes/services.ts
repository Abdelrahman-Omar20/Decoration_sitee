import { Router } from 'express';
import { serviceRepository } from '../../infrastructure/database/ServiceRepository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all services (public)
router.get('/', (req, res) => {
    try {
        const services = serviceRepository.findAll();
        res.json(services);
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Create service (admin only)
router.post('/', authMiddleware, (req, res) => {
    try {
        const { title, titleAr, description, descriptionAr, icon, sortOrder } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description required' });
        }
        const service = serviceRepository.create({ title, titleAr, description, descriptionAr, icon, sortOrder });
        res.status(201).json(service);
    } catch (error) {
        console.error('Create service error:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// Update service (admin only)
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const service = serviceRepository.update(req.params.id, req.body);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error('Update service error:', error);
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// Delete service (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const success = serviceRepository.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Delete service error:', error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

export default router;
