import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { readDb, writeDb } from './connection';
import type { User, CreateUserDto } from '../../core/domain/entities/User';

export class UserRepository {
    findByEmail(email: string): User | null {
        const db = readDb();
        return db.users.find(u => u.email === email) || null;
    }

    findById(id: string): User | null {
        const db = readDb();
        return db.users.find(u => u.id === id) || null;
    }

    async create(dto: CreateUserDto): Promise<User> {
        const db = readDb();
        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user: User = {
            id: uuidv4(),
            email: dto.email,
            passwordHash,
            role: dto.role || 'editor',
            createdAt: new Date(),
        };

        db.users.push(user);
        writeDb(db);
        return user;
    }

    async verifyPassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.passwordHash);
    }
}

export const userRepository = new UserRepository();
