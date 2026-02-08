// Domain Entity: Service
export interface Service {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    sortOrder: number;
    createdAt: Date;
}

export interface CreateServiceDto {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon?: string;
    sortOrder?: number;
}
