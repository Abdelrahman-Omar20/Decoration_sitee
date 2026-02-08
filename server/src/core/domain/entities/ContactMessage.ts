// Domain Entity: Contact Message
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    service: string | null;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

export interface CreateContactMessageDto {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
}
