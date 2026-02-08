import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './connection';
import type { Video, CreateVideoDto, UpdateVideoDto } from '../../core/domain/entities/Video';

import { categoryRepository } from './CategoryRepository';

export class VideoRepository {
    findAll(filters?: { categoryId?: string; isFeatured?: boolean; limit?: number }): any[] {
        const db = readDb();
        const categories = categoryRepository.findAll();
        let videos = db.videos;

        if (filters?.categoryId) {
            videos = videos.filter(v => v.categoryId === filters.categoryId);
        }
        if (filters?.isFeatured !== undefined) {
            videos = videos.filter(v => v.isFeatured === filters.isFeatured);
        }

        let results = videos.map(v => {
            const category = categories.find(c => c.id === v.categoryId);
            return {
                ...v,
                category: category ? category.name : 'Uncategorized',
                categoryAr: category ? category.nameAr : 'غير مصنف',
            };
        });

        results = results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (filters?.limit) {
            results = results.slice(0, filters.limit);
        }

        return results;
    }

    findById(id: string): any | null {
        const db = readDb();
        const video = db.videos.find(v => v.id === id);
        if (!video) return null;

        const categories = categoryRepository.findAll();
        const category = categories.find(c => c.id === video.categoryId);

        return {
            ...video,
            category: category ? category.name : 'Uncategorized',
            categoryAr: category ? category.nameAr : 'غير مصنف',
        };
    }

    create(dto: CreateVideoDto): Video {
        const db = readDb();
        const now = new Date().toISOString();

        const video: Video = {
            id: uuidv4(),
            title: dto.title,
            titleAr: dto.titleAr,
            description: dto.description,
            descriptionAr: dto.descriptionAr,
            videoUrl: dto.videoUrl,
            thumbnailUrl: dto.thumbnailUrl || null,
            categoryId: dto.categoryId || null,
            isInstagramReel: dto.isInstagramReel || false,
            instagramId: dto.instagramId || null,
            isFeatured: dto.isFeatured || false,
            duration: dto.duration || null,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        };

        db.videos.push(video);
        writeDb(db);
        return video;
    }

    update(id: string, dto: UpdateVideoDto): Video | null {
        const db = readDb();
        const index = db.videos.findIndex(v => v.id === id);
        if (index === -1) return null;

        const updated = {
            ...db.videos[index],
            ...dto,
            updatedAt: new Date().toISOString(),
        };
        db.videos[index] = updated;
        writeDb(db);
        return updated;
    }

    delete(id: string): boolean {
        const db = readDb();
        const index = db.videos.findIndex(v => v.id === id);
        if (index === -1) return false;

        db.videos.splice(index, 1);
        writeDb(db);
        return true;
    }
}

export const videoRepository = new VideoRepository();
