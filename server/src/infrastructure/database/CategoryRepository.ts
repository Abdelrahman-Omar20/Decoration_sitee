import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './connection';
import type { Category, CreateCategoryDto } from '../../core/domain/entities/Category';

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export class CategoryRepository {
    findAll(): Category[] {
        const db = readDb();
        return db.categories.sort((a, b) => a.name.localeCompare(b.name));
    }

    findById(id: string): Category | null {
        const db = readDb();
        return db.categories.find(c => c.id === id) || null;
    }

    findBySlug(slug: string): Category | null {
        const db = readDb();
        return db.categories.find(c => c.slug === slug) || null;
    }

    create(dto: CreateCategoryDto): Category {
        const db = readDb();
        const category: Category = {
            id: uuidv4(),
            name: dto.name,
            nameAr: dto.nameAr,
            slug: dto.slug || slugify(dto.name),
            createdAt: new Date(),
        };

        db.categories.push(category);
        writeDb(db);
        return category;
    }

    delete(id: string): boolean {
        const db = readDb();
        const index = db.categories.findIndex(c => c.id === id);
        if (index === -1) return false;

        db.categories.splice(index, 1);
        writeDb(db);
        return true;
    }
}

export const categoryRepository = new CategoryRepository();
