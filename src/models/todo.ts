export interface Todo {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt: Date;
    updatedAt: Date;

    authorId: number;
    author: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };

}

