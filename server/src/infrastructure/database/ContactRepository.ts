import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './connection';
import type { ContactMessage, CreateContactMessageDto } from '../../core/domain/entities/ContactMessage';

export class ContactRepository {
    findAll(): ContactMessage[] {
        const db = readDb();
        return db.contactMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    findById(id: string): ContactMessage | null {
        const db = readDb();
        return db.contactMessages.find(c => c.id === id) || null;
    }

    create(dto: CreateContactMessageDto): ContactMessage {
        const db = readDb();
        const message: ContactMessage = {
            id: uuidv4(),
            name: dto.name,
            email: dto.email,
            phone: dto.phone || null,
            service: dto.service || null,
            message: dto.message,
            isRead: false,
            createdAt: new Date(),
        };

        db.contactMessages.push(message);
        writeDb(db);
        return message;
    }

    markAsRead(id: string): boolean {
        const db = readDb();
        const index = db.contactMessages.findIndex(c => c.id === id);
        if (index === -1) return false;

        db.contactMessages[index].isRead = true;
        writeDb(db);
        return true;
    }

    delete(id: string): boolean {
        const db = readDb();
        const index = db.contactMessages.findIndex(c => c.id === id);
        if (index === -1) return false;

        db.contactMessages.splice(index, 1);
        writeDb(db);
        return true;
    }
}

export const contactRepository = new ContactRepository();
