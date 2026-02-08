import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../../infrastructure/database/UserRepository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const user = userRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await userRepository.verifyPassword(user, password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get current user
router.get('/me', authMiddleware, (req, res) => {
    const user = userRepository.findById(req.user!.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({
        id: user.id,
        email: user.email,
        role: user.role,
    });
});

export default router;
