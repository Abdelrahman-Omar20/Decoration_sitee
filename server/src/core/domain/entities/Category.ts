// Domain Entity: Category
export interface Category {
    id: string;
    name: string;
    nameAr: string;
    slug: string;
    createdAt: Date;
}

export interface CreateCategoryDto {
    name: string;
    nameAr: string;
    slug?: string;
}
