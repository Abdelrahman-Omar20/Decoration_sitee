import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './connection';
import type { Service, CreateServiceDto } from '../../core/domain/entities/Service';

export class ServiceRepository {
    findAll(): Service[] {
        const db = readDb();
        return db.services.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    findById(id: string): Service | null {
        const db = readDb();
        return db.services.find(s => s.id === id) || null;
    }

    create(dto: CreateServiceDto): Service {
        const db = readDb();
        const service: Service = {
            id: uuidv4(),
            title: dto.title,
            titleAr: dto.titleAr,
            description: dto.description,
            descriptionAr: dto.descriptionAr,
            icon: dto.icon || '✨',
            sortOrder: dto.sortOrder || 0,
            createdAt: new Date(),
        };

        db.services.push(service);
        writeDb(db);
        return service;
    }

    update(id: string, dto: Partial<CreateServiceDto>): Service | null {
        const db = readDb();
        const index = db.services.findIndex(s => s.id === id);
        if (index === -1) return null;

        db.services[index] = { ...db.services[index], ...dto };
        writeDb(db);
        return db.services[index];
    }

    delete(id: string): boolean {
        const db = readDb();
        const index = db.services.findIndex(s => s.id === id);
        if (index === -1) return false;

        db.services.splice(index, 1);
        writeDb(db);
        return true;
    }
}

export const serviceRepository = new ServiceRepository();
