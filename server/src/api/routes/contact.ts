import { Router } from 'express';
import { contactRepository } from '../../infrastructure/database/ContactRepository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Submit contact form (public)
router.post('/', (req, res) => {
    try {
        const { name, email, message, phone, service } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message required' });
        }

        const contact = contactRepository.create({ name, email, message, phone, service });
        res.status(201).json({ success: true, id: contact.id });
    } catch (error) {
        console.error('Contact submit error:', error);
        res.status(500).json({ error: 'Failed to submit message' });
    }
});

// Get all messages (admin only)
router.get('/', authMiddleware, (req, res) => {
    try {
        const messages = contactRepository.findAll();
        res.json(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Mark as read (admin only)
router.patch('/:id/read', authMiddleware, (req, res) => {
    try {
        const success = contactRepository.markAsRead(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ error: 'Failed to update message' });
    }
});

// Delete message (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const success = contactRepository.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

export default router;
