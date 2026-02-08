// Domain Entity: User
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'editor';
    createdAt: Date;
}

export interface CreateUserDto {
    email: string;
    password: string;
    role?: 'admin' | 'editor';
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthPayload {
    userId: string;
    email: string;
    role: string;
}
