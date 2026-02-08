// Domain Entity: BlogPost
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string | null;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBlogPostDto {
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    publishedAt?: Date;
}
