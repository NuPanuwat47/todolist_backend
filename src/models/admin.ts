export interface Admin {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: 'admin';
}