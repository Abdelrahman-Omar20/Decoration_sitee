// Domain Entity: Video
export interface Video {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    videoUrl: string;
    thumbnailUrl: string | null;
    categoryId: string | null;
    isInstagramReel: boolean;
    instagramId: string | null;
    isFeatured: boolean;
    duration: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateVideoDto {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    videoUrl: string;
    thumbnailUrl?: string;
    categoryId?: string;
    isInstagramReel?: boolean;
    instagramId?: string;
    isFeatured?: boolean;
    duration?: string;
}

export interface UpdateVideoDto {
    title?: string;
    titleAr?: string;
    description?: string;
    descriptionAr?: string;
    thumbnailUrl?: string;
    categoryId?: string;
    isFeatured?: boolean;
    duration?: string;
}
